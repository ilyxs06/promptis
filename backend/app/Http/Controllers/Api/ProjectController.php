<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Project::with(['client.user', 'employees.user']);

        // Filtrer selon le rôle
        if ($user->role === 'client') {
            if (!$user->client) {
                return response()->json([
                    'message' => 'Profil client introuvable pour cet utilisateur.',
                ], 422);
            }

            $query->where('client_id', $user->client->id);
        } elseif ($user->role === 'employee') {
            if (!$user->employee) {
                return response()->json([
                    'message' => 'Profil employé introuvable pour cet utilisateur.',
                ], 422);
            }

            $query->whereHas('employees', function ($q) use ($user) {
                $q->where('employee_id', $user->employee->id);
            });
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'client_id' => 'required|exists:clients,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'status' => 'nullable|string',
            'progress' => 'nullable|integer|min:0|max:100',
            'employee_ids' => 'nullable|array',
            'employee_ids.*' => 'exists:employees,id',
        ]);

        $validated['status'] = $validated['status'] ?? 'planifie';
        $employeeIds = $validated['employee_ids'] ?? [];
        unset($validated['employee_ids']);

        $project = Project::create($validated);

        if (!empty($employeeIds)) {
            $project->employees()->sync($employeeIds);
        }

        return response()->json($project->load(['client.user', 'employees.user']), 201);
    }

    public function show(Project $project)
    {
        return response()->json($project->load(['client.user', 'employees.user', 'tickets', 'files']));
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'client_id' => 'sometimes|exists:clients,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
            'status' => 'sometimes|string',
            'progress' => 'nullable|integer|min:0|max:100',
            'employee_ids' => 'nullable|array',
            'employee_ids.*' => 'exists:employees,id',
        ]);

        $employeeIds = $validated['employee_ids'] ?? null;
        unset($validated['employee_ids']);

        $project->update($validated);

        if ($employeeIds !== null) {
            $project->employees()->sync($employeeIds);
        }

        return response()->json($project->load(['client.user', 'employees.user']));
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'message' => 'Projet supprimé avec succès',
        ]);
    }

    public function assignEmployee(Request $request, Project $project)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'role' => 'nullable|string|max:255',
        ]);

        $project->employees()->syncWithoutDetaching([
            $validated['employee_id'] => ['role' => $validated['role'] ?? 'Développeur']
        ]);

        return response()->json($project->load(['employees.user']));
    }

    public function removeEmployee(Request $request, Project $project)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
        ]);

        $project->employees()->detach($validated['employee_id']);

        return response()->json($project->load(['employees.user']));
    }
}
