<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Manuscript;
use Illuminate\Support\Facades\Input;
use DB;
class ManuscriptController extends Controller
{
    //
    public function create(Request $request){
     $manuscript = new Manuscript();
     $photo = Input::file('photo');
     $photo->move('manuscript', $photo->getClientOriginalName());
     $photo_path = "http://127.0.0.1:8000/manuscript/".$photo->getClientOriginalName();
     $manuscript->photo = $photo_path; 
     $manuscript->title = $request->request->get('title');
     $manuscript->sypnosis = $request->request->get('sypnosis');
     $manuscript->authorID = $request->request->get('authorID');
     $manuscript->publisherID = $request->request->get('publisherID');
     $manuscript->genreID = $request->request->get('genreID');
     $manuscript->save();
    }

    public function get(){
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
            ->join('users', 'users.id', '=', 'manuscripts.authorID')
            ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
            ->select('*', 'manuscripts.created_at as publishedDate')
            ->where('manuscripts.publisherID', $id)
            ->get();
        return $manuscript;
    }
}
