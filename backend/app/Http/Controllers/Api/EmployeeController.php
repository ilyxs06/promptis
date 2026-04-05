<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with('user')->get();
        return response()->json($employees);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'position' => 'required|string|max:255',
            'department' => 'nullable|string|max:100',
            'hire_date' => 'nullable|date',
            'phone' => 'nullable|string|max:20',
            'skills' => 'nullable|array',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'employee',
        ]);

        $employee = Employee::create([
            'user_id' => $user->id,
            'position' => $validated['position'],
            'department' => $validated['department'] ?? null,
            'hire_date' => $validated['hire_date'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'skills' => $validated['skills'] ?? [],
        ]);

        return response()->json($employee->load('user'), 201);
    }

    public function show(Employee $employee)
    {
        return response()->json($employee->load(['user', 'projects']));
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $employee->user_id,
            'position' => 'sometimes|string|max:255',
            'department' => 'nullable|string|max:100',
            'hire_date' => 'nullable|date',
            'phone' => 'nullable|string|max:20',
            'skills' => 'nullable|array',
        ]);

        if (isset($validated['name']) || isset($validated['email'])) {
            $employee->user->update([
                'name' => $validated['name'] ?? $employee->user->name,
                'email' => $validated['email'] ?? $employee->user->email,
            ]);
        }

        $employee->update([
            'position' => $validated['position'] ?? $employee->position,
            'department' => $validated['department'] ?? $employee->department,
            'hire_date' => $validated['hire_date'] ?? $employee->hire_date,
            'phone' => $validated['phone'] ?? $employee->phone,
            'skills' => $validated['skills'] ?? $employee->skills,
        ]);

        return response()->json($employee->load('user'));
    }

    public function destroy(Employee $employee)
    {
        $employee->user->delete();
        $employee->delete();

        return response()->json([
            'message' => 'Employé supprimé avec succès',
        ]);
    }
}
