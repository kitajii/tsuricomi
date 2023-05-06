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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('ユーザーID');
            $table->string('name', 30)->comment('名前');
            $table->unsignedInteger('birthday_year')->nullable()->comment('生年月日(年)');
            $table->unsignedTinyInteger('birthday_month')->nullable()->comment('生年月日(月)');
            $table->unsignedTinyInteger('birthday_day')->nullable()->comment('生年月日(日)');
            $table->string('icon_path')->nullable()->comment('アイコンパス');
            $table->unsignedTinyInteger('experience')->nullable()->comment('釣り歴');
            $table->text('introduction')->nullable()->comment('プロフィールコメント');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
};
