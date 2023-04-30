<?php

namespace App\Models;

use App\Libs\Util;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'birthday_year',
        'birthday_month',
        'birthday_day',
        'icon_path',
        'experience',
        'introduction',
    ];

    public function saveIcon($icon)
    {
        $filePath = storage_path('app/icon/' . $this->id . '/');
        if (!isset($this->icon)) Util::deleteFile($filePath, 'icon');
        if (isset($icon)) {
            $fileName = 'icon.' . $icon->getClientOriginalExtension();
            $icon->move($filePath, $fileName);
        }
        $this->icon_path = $fileName;
        $this->save();
    }
}
