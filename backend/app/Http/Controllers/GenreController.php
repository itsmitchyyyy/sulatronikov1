<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Genre;
class GenreController extends Controller
{
    //
    public function all(){
        return Genre::all();
    }

    public function find(){
        $id = $_GET['id'];
        return Genre::find($id);
    }
}
