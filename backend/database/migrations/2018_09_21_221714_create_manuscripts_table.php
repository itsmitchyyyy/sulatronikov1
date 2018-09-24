<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateManuscriptsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('manuscripts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('photo')->nullable();
            $table->string('title');
            $table->string('type')->nullable();
            $table->text('sypnosis');
            $table->string('chapter')->nullable();
            $table->integer('authorID')->unsigned();
            $table->integer('publisherID')->unsigned()->nullable();
            $table->integer('genreID')->unsigned();
            $table->string('attachment')->nullable();
            $table->string('status')->default(0);
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
        Schema::dropIfExists('manuscripts');
    }
}
