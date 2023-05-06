<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'fishing_time',
        'latitude',
        'longitude',
        'image_path1',
        'image_path2',
        'image_path3',
        'prefecture_name',
        'city_name',
        'size',
        'weight',
        'lure',
        'weather',
        'wind_direction',
        'public_memo',
        'self_memo',
    ];

    public function saveRecord()
    {
    }
}
