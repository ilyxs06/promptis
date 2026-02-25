<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\Api\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/profile/password', [AuthController::class, 'updatePassword']);

    // Statistics
    Route::get('/stats/dashboard', [StatsController::class, 'dashboard']);

    // Employees (Admin only)
    Route::apiResource('employees', EmployeeController::class)
        ->middleware('admin');

    // Clients (Admin only)
    Route::apiResource('clients', ClientController::class)
        ->middleware('admin');

    // Projects
    Route::apiResource('projects', ProjectController::class);
    Route::post('/projects/{project}/assign-employee', [ProjectController::class, 'assignEmployee'])
        ->middleware('admin');
    Route::post('/projects/{project}/remove-employee', [ProjectController::class, 'removeEmployee'])
        ->middleware('admin');
    Route::get('/projects/{project}/files', [FileController::class, 'index']);
    Route::post('/projects/{project}/files', [FileController::class, 'store']);

    // Tickets
    Route::apiResource('tickets', TicketController::class);
    Route::post('/tickets/{ticket}/comments', [TicketController::class, 'addComment']);

    // Files
    Route::apiResource('files', FileController::class)->except(['update']);
    Route::get('/files/{file}/download', [FileController::class, 'download']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::post('/notifications/check-deadlines', [NotificationController::class, 'checkDeadlines']);
    Route::put('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
    Route::delete('/notifications/{notification}', [NotificationController::class, 'destroy']);
});
