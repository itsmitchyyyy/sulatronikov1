<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Manuscript extends Model
{
    //
    protected $fillable = [
        'photo', 
        'title',
        'sypnosis',
        'authorID',
        'genreID', 
    ];
}
