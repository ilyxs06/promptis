<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Ticket;
use App\Models\Employee;
use App\Models\Client;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function dashboard(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            return $this->adminStats();
        } elseif ($user->role === 'employee') {
            return $this->employeeStats($user);
        } elseif ($user->role === 'client') {
            return $this->clientStats($user);
        }
    }

    private function adminStats()
    {
        return response()->json([
            'totalProjects' => Project::count(),
            'activeProjects' => Project::where('status', 'in_progress')->count(),
            'completedProjects' => Project::where('status', 'completed')->count(),
            'totalEmployees' => Employee::count(),
            'totalClients' => Client::count(),
            'openTickets' => Ticket::where('status', 'open')->count(),
            'urgentTickets' => Ticket::where('priority', 'urgent')->count(),
        ]);
    }

    private function employeeStats($user)
    {
        $employeeId = $user->employee->id;

        return response()->json([
            'myProjects' => Project::whereHas('employees', function ($q) use ($employeeId) {
                $q->where('employee_id', $employeeId);
            })->count(),
            'activeProjects' => Project::where('status', 'in_progress')
                ->whereHas('employees', function ($q) use ($employeeId) {
                    $q->where('employee_id', $employeeId);
                })->count(),
            'assignedTickets' => Ticket::where('assigned_to', $employeeId)->count(),
            'openTickets' => Ticket::where('assigned_to', $employeeId)
                ->where('status', 'open')->count(),
        ]);
    }

    private function clientStats($user)
    {
        $clientId = $user->client->id;

        return response()->json([
            'totalProjects' => Project::where('client_id', $clientId)->count(),
            'activeProjects' => Project::where('client_id', $clientId)
                ->where('status', 'in_progress')->count(),
            'completedProjects' => Project::where('client_id', $clientId)
                ->where('status', 'completed')->count(),
            'myTickets' => Ticket::where('client_id', $clientId)->count(),
            'openTickets' => Ticket::where('client_id', $clientId)
                ->where('status', 'open')->count(),
        ]);
    }
}
