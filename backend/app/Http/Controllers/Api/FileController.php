<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index(Request $request, $project = null)
    {
        $projectId = $project ?? $request->query('project_id');

        $query = File::with(['project', 'uploader']);

        if ($projectId) {
            $query->where('project_id', $projectId);
        }

        return response()->json($query->get());
    }

    public function store(Request $request, $project = null)
    {
        $projectId = $project ?? $request->input('project_id');

        $validated = $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'description' => 'nullable|string',
        ]);

        if (!$projectId) {
            return response()->json(['error' => 'project_id is required'], 400);
        }

        $uploadedFile = $request->file('file');
        $filename = time() . '_' . $uploadedFile->getClientOriginalName();
        $path = $uploadedFile->storeAs('projects', $filename, 'public');

        $file = File::create([
            'project_id' => $projectId,
            'uploaded_by' => $request->user()->id,
            'filename' => $uploadedFile->getClientOriginalName(),
            'filepath' => $path,
            'filesize' => $uploadedFile->getSize(),
            'mimetype' => $uploadedFile->getMimeType(),
            'description' => $validated['description'] ?? null,
        ]);

        return response()->json($file->load(['project', 'uploader']), 201);
    }

    public function show(File $file)
    {
        return response()->json($file->load(['project', 'uploader']));
    }

    public function download(File $file)
    {
        if (!Storage::disk('public')->exists($file->filepath)) {
            return response()->json([
                'message' => 'Fichier introuvable',
            ], 404);
        }

        return response()->download(Storage::disk('public')->path($file->filepath), $file->filename);
    }

    public function destroy(File $file)
    {
        if (Storage::disk('public')->exists($file->filepath)) {
            Storage::disk('public')->delete($file->filepath);
        }

        $file->delete();

        return response()->json([
            'message' => 'Fichier supprimé avec succès',
        ]);
    }
}
