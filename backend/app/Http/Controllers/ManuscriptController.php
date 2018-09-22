<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Manuscript;
use Illuminate\Support\Facades\Input;
class ManuscriptController extends Controller
{
    //
    public function create(Request $request){
     $manuscript = new Manuscript();
     $manuscript->photo = Input::file('photo');
     $manuscript->title = $request->request->get('title');
     $manuscript->sypnosis = $request->request->get('sypnosis');
     $manuscript->authorID = $request->request->get('authorID');
     $manuscript->genreID = $request->request->get('genreID');
     $manuscript->save();
    }
}
