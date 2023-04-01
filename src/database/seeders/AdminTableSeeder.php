<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::flushEventListeners();
        DB::table('admins')->truncate();

        $Admins = [
            [
                'email' => 'kazu.rmcf@gmail.com',
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($Admins as $Admin) {
            Admin::create([
                'email' => $Admin['email'],
                'password' => $Admin['password'],
                'name' => '管理ユーザー',
                'created_at' => date('Y-m-d H:i:d'),
            ]);
        }
    }
}