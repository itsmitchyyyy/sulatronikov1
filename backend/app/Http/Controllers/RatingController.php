<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Rating;

class RatingController extends Controller
{
    //
    public function create(Request $request){
        return Rating::create($request->except(['token']));
    }
}
