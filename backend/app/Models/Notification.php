<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'title',
        'message',
        'priority',
        'related_id',
        'related_type',
        'is_read',
        'read_at',
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'read_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function related()
    {
        return $this->morphTo();
    }

    /**
     * Create a notification for all admins
     */
    public static function notifyAdmins(string $type, string $title, string $message, string $priority = 'normal', $relatedId = null, $relatedType = null)
    {
        $admins = User::where('role', 'admin')->get();

        foreach ($admins as $admin) {
            self::create([
                'user_id' => $admin->id,
                'type' => $type,
                'title' => $title,
                'message' => $message,
                'priority' => $priority,
                'related_id' => $relatedId,
                'related_type' => $relatedType,
            ]);
        }
    }

    /**
     * Create a notification for specific user
     */
    public static function notifyUser(int $userId, string $type, string $title, string $message, string $priority = 'normal', $relatedId = null, $relatedType = null)
    {
        return self::create([
            'user_id' => $userId,
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'priority' => $priority,
            'related_id' => $relatedId,
            'related_type' => $relatedType,
        ]);
    }
}
