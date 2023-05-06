<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('ユーザーID');
            $table->dateTime('fishing_time')->comment('釣果日時');
            $table->float('latitude', 7, 5)->comment('緯度');
            $table->float('longitude', 8, 5)->comment('経度');
            $table->string('image_path1')->nullable()->comment('写真パス');
            $table->string('image_path2')->nullable()->comment('写真パス');
            $table->string('image_path3')->nullable()->comment('写真パス');
            $table->string('prefecture_name')->nullable()->comment('都道府県名');
            $table->string('city_name')->nullable()->comment('市区町村名');
            $table->integer('size')->nullable()->comment('サイズ');
            $table->integer('weight')->nullable()->comment('重さ');
            $table->string('lure')->nullable()->comment('ルアー');
            $table->integer('weather')->nullable()->comment('天候');
            $table->integer('wind_direction')->nullable()->comment('風向');
            $table->text('public_memo')->nullable()->comment('公開メモ');
            $table->text('self_memo')->nullable()->comment('非公開メモ');
            $table->timestamps();
            // TODO追加予定
            // ポイント公開フラグ、ルアー公開フラグ、ボートフラグ、気温、水温
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('records');
    }
};
