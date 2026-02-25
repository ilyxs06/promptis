<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\TicketComment;
use App\Models\Notification;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Ticket::with(['project', 'employee']);

        // Filtrer selon le rôle
        if ($user->role === 'client' && $user->client) {
            $query->where('client_id', $user->client->id);
        } elseif ($user->role === 'employee' && $user->employee) {
            $query->where(function ($q) use ($user) {
                $q->where('employee_id', $user->employee->id)
                  ->orWhereHas('project.employees', function ($q2) use ($user) {
                      $q2->where('employee_id', $user->employee->id);
                  });
            });
        }
        // Admin voit tous les tickets

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'nullable|string',
            'status' => 'nullable|string',
            'employee_id' => 'nullable|exists:employees,id',
        ]);

        $user = $request->user();

        // Récupérer le client_id du projet si l'utilisateur n'est pas un client
        $project = \App\Models\Project::find($validated['project_id']);
        $clientId = $user->role === 'client' && $user->client ? $user->client->id : $project->client_id;

        $ticket = Ticket::create([
            'project_id' => $validated['project_id'],
            'client_id' => $clientId,
            'employee_id' => $validated['employee_id'] ?? null,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'priority' => $validated['priority'] ?? 'moyenne',
            'status' => $validated['status'] ?? 'ouvert',
        ]);

        // Notify admins about new ticket
        $ticket->load(['project']);
        $this->notifyTicketCreated($ticket);

        return response()->json($ticket, 201);
    }

    /**
     * Generate notification after ticket creation
     */
    private function notifyTicketCreated(Ticket $ticket)
    {
        $priorityLabel = match ($ticket->priority) {
            'urgente' => 'Urgente',
            'haute' => 'Haute',
            'moyenne' => 'Moyenne',
            'basse' => 'Basse',
            default => $ticket->priority,
        };

        $isHighPriority = in_array($ticket->priority, ['urgente', 'haute']);

        $title = $isHighPriority
            ? "Ticket {$priorityLabel} créé"
            : "Nouveau ticket créé";

        $projectName = $ticket->project ? $ticket->project->title : 'N/A';
        $message = "Ticket \"{$ticket->title}\" (priorité: {$priorityLabel}) créé pour le projet \"{$projectName}\".";

        $notifPriority = match ($ticket->priority) {
            'urgente' => 'urgent',
            'haute' => 'high',
            default => 'normal',
        };

        Notification::notifyAdmins(
            'ticket_created',
            $title,
            $message,
            $notifPriority,
            $ticket->id,
            Ticket::class
        );

        // Notify the assigned employee
        if ($ticket->employee_id) {
            $employee = \App\Models\Employee::with('user')->find($ticket->employee_id);
            if ($employee && $employee->user) {
                Notification::notifyUser(
                    $employee->user->id,
                    'ticket_created',
                    $title,
                    $message,
                    $notifPriority,
                    $ticket->id,
                    Ticket::class
                );
            }
        }

        // Notify the client who owns the project
        if ($ticket->client_id) {
            $client = \App\Models\Client::with('user')->find($ticket->client_id);
            if ($client && $client->user) {
                Notification::notifyUser(
                    $client->user->id,
                    'ticket_created',
                    $title,
                    $message,
                    $notifPriority,
                    $ticket->id,
                    Ticket::class
                );
            }
        }

        // Notify all employees assigned to the project
        if ($ticket->project) {
            $projectEmployees = $ticket->project->employees()->with('user')->get();
            foreach ($projectEmployees as $emp) {
                // Skip if already notified as assigned employee
                if ($emp->id === $ticket->employee_id) continue;
                if ($emp->user) {
                    Notification::notifyUser(
                        $emp->user->id,
                        'ticket_created',
                        $title,
                        $message,
                        $notifPriority,
                        $ticket->id,
                        Ticket::class
                    );
                }
            }
        }
    }

    public function show(Ticket $ticket)
    {
        return response()->json($ticket->load(['project', 'employee']));
    }

    public function update(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'priority' => 'sometimes|string',
            'status' => 'sometimes|string',
            'employee_id' => 'nullable|exists:employees,id',
        ]);

        $ticket->update($validated);

        return response()->json($ticket->load(['project', 'employee']));
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json([
            'message' => 'Ticket supprimé avec succès',
        ]);
    }

    public function addComment(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment = TicketComment::create([
            'ticket_id' => $ticket->id,
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
        ]);

        return response()->json($comment->load('user'), 201);
    }
}
