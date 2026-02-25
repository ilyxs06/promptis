<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Project;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Get all notifications for the authenticated user
     */
    public function index(Request $request)
    {
        $notifications = Notification::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();

        return response()->json($notifications);
    }

    /**
     * Get unread notification count
     */
    public function unreadCount(Request $request)
    {
        $count = Notification::where('user_id', $request->user()->id)
            ->where('is_read', false)
            ->count();

        return response()->json(['count' => $count]);
    }

    /**
     * Mark a single notification as read
     */
    public function markAsRead(Request $request, Notification $notification)
    {
        if ($notification->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $notification->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return response()->json($notification);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead(Request $request)
    {
        Notification::where('user_id', $request->user()->id)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return response()->json(['message' => 'Toutes les notifications marquées comme lues']);
    }

    /**
     * Delete a notification
     */
    public function destroy(Request $request, Notification $notification)
    {
        if ($notification->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $notification->delete();

        return response()->json(['message' => 'Notification supprimée']);
    }

    /**
     * Check projects with approaching deadlines and create notifications
     * Called periodically or on dashboard load
     */
    public function checkDeadlines(Request $request)
    {
        $user = $request->user();

        $now = now();
        $threeDaysFromNow = $now->copy()->addDays(3);

        // Find projects that are "en_cours" and end_date is within 3 days or past
        $projects = Project::with(['client.user', 'employees.user'])
            ->where('status', 'en_cours')
            ->whereNotNull('end_date')
            ->where('end_date', '<=', $threeDaysFromNow)
            ->get();

        $created = 0;

        foreach ($projects as $project) {
            $daysLeft = $now->diffInDays($project->end_date, false);

            if ($daysLeft < 0) {
                $title = ' Projet en retard';
                $message = "Le projet \"{$project->title}\" a dépassé sa date de fin de " . abs($daysLeft) . " jour(s).";
                $priority = 'urgent';
            } elseif ($daysLeft == 0) {
                $title = ' Échéance aujourd\'hui';
                $message = "Le projet \"{$project->title}\" arrive à échéance aujourd'hui !";
                $priority = 'urgent';
            } else {
                $title = ' Échéance proche';
                $message = "Le projet \"{$project->title}\" arrive à échéance dans {$daysLeft} jour(s).";
                $priority = 'high';
            }

            // Collect all user IDs to notify (admins + project employees + client)
            $userIdsToNotify = [];

            // Admins
            $admins = \App\Models\User::where('role', 'admin')->pluck('id')->toArray();
            $userIdsToNotify = array_merge($userIdsToNotify, $admins);

            // Project employees
            foreach ($project->employees as $emp) {
                if ($emp->user) {
                    $userIdsToNotify[] = $emp->user->id;
                }
            }

            // Project client
            if ($project->client && $project->client->user) {
                $userIdsToNotify[] = $project->client->user->id;
            }

            $userIdsToNotify = array_unique($userIdsToNotify);

            foreach ($userIdsToNotify as $userId) {
                // Check if already notified today
                $existingToday = Notification::where('user_id', $userId)
                    ->where('type', 'project_deadline')
                    ->where('related_id', $project->id)
                    ->where('related_type', Project::class)
                    ->whereDate('created_at', $now->toDateString())
                    ->exists();

                if (!$existingToday) {
                    Notification::notifyUser(
                        $userId,
                        'project_deadline',
                        $title,
                        $message,
                        $priority,
                        $project->id,
                        Project::class
                    );
                    $created++;
                }
            }
        }

        return response()->json([
            'message' => "{$created} notification(s) de deadline créée(s)",
            'checked_projects' => $projects->count(),
        ]);
    }
}
