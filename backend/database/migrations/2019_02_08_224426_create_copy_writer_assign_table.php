<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCopyWriterAssignTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('copy_writer_assign', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('copywriterId')->unsigned();
            $table->integer('authorId')->unsigned();
            $table->integer('genreId')->unsigned();
            $table->string('title');
            $table->string('attachment');
            $table->string('status');
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
        Schema::dropIfExists('copy_writer_assign');
    }
}
