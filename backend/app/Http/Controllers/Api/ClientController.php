<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::with('user')->get();
        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'company_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'client',
        ]);

        $client = Client::create([
            'user_id' => $user->id,
            'company_name' => $validated['company_name'],
            'contact_name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
        ]);

        return response()->json($client->load('user'), 201);
    }

    public function show(Client $client)
    {
        return response()->json($client->load(['user', 'projects']));
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $client->user_id,
            'company_name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
        ]);

        if (isset($validated['name']) || isset($validated['email'])) {
            $client->user->update([
                'name' => $validated['name'] ?? $client->user->name,
                'email' => $validated['email'] ?? $client->user->email,
            ]);
        }

        $client->update([
            'company_name' => $validated['company_name'] ?? $client->company_name,
            'phone' => $validated['phone'] ?? $client->phone,
            'address' => $validated['address'] ?? $client->address,
        ]);

        return response()->json($client->load('user'));
    }

    public function destroy(Client $client)
    {
        $client->user->delete();
        $client->delete();

        return response()->json([
            'message' => 'Client supprimé avec succès',
        ]);
    }
}
