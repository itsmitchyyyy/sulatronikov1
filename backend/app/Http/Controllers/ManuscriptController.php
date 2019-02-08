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
     if(Input::hasFile('photo')){
     $photo = Input::file('photo');
     $photo->move('manuscript', $photo->getClientOriginalName());
     $photo_path = "http://127.0.0.1:8000/manuscript/".$photo->getClientOriginalName();
     $manuscript->photo = $photo_path; 
    }
    if(Input::hasFile('attachment')){
        $attachment = Input::file('attachment');
        $attachment->move('manuscript', $attachment->getClientOriginalName());
        $attachment_path = "http://127.0.0.1:8000/manuscript/".$attachment->getClientOriginalName();
        $manuscript->attachment = $attachment_path; 
    }
     $manuscript->title = $request->request->get('title');
     $manuscript->sypnosis = $request->request->get('sypnosis');
     $manuscript->authorID = $request->request->get('authorID');
     $manuscript->publisherID = $request->request->get('publisherID');
     $manuscript->genreID = $request->request->get('genreID');
     $manuscript->status = $request->request->get('status');
     $manuscript->save();
    }

    public function get(){
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
            ->join('users', 'users.id', '=', 'manuscripts.authorID')
            ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
            ->select('*', 
            'manuscripts.created_at as publishedDate',
            'manuscripts.id as manuscriptID')
            ->where([
                ['manuscripts.publisherID', '=', $id],
                ['manuscripts.status','=',0]
            ])
            ->get();
        return $manuscript;
    }

    public function publishedGet(){
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
            ->join('users', 'users.id', '=', 'manuscripts.authorID')
            ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
            ->select('*', 
            'manuscripts.created_at as publishedDate',
            'manuscripts.id as manuscriptID')
            ->where('manuscripts.publisherID', $id)
            ->where('manuscripts.status',1)
            ->orWhere('manuscripts.status',2)
            ->get();
        return $manuscript;
    }

    public function authorManuscriptPublished(){
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
            ->join('users', 'users.id', '=', 'manuscripts.authorID')
            ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
            ->select('*', 
            'manuscripts.created_at as publishedDate',
            'manuscripts.id as manuscriptID')
            ->where('manuscripts.authorID', $id)
            ->where('manuscripts.status',1)
            ->orWhere('manuscripts.status',2)
            ->get();
            return $manuscript;
    }

    public function authorManuscriptUnpublished(){
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
            ->join('users', 'users.id', '=', 'manuscripts.authorID')
            ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
            ->select('*', 
            'manuscripts.created_at as publishedDate',
            'manuscripts.id as manuscriptID')
            ->where([
                ['manuscripts.authorID', '=', $id],
                ['manuscripts.status','=',0]
            ])
            ->get();
            return $manuscript;
    }

    public function edit(){
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
            ->join('users', 'users.id', '=', 'manuscripts.authorID')
            ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
            ->select('*', 
            'manuscripts.created_at as publishedDate',
            'manuscripts.id as manuscriptID')
            ->where('manuscripts.id', $id)
            ->first();
        return response()->json($manuscript);
    }

    function publishBook(){
        $id = $_GET['id'];
        $manuscript = Manuscript::find($id);
        $manuscript->status = 2;
        $manuscript->save();
    }

    function allBooks(){
        $manuscript = Manuscript::where('status', 2)->get();
        return $manuscript;
    }

    public function update(Request $request){
        $id = $request->request->get('id');
        $manuscript = Manuscript::find($id);
        if(Input::hasFile('photo')){
            $photo = Input::file('photo');
            $photo->move('manuscript', $photo->getClientOriginalName());
            $photo_path = "http://127.0.0.1:8000/manuscript/".$photo->getClientOriginalName();
                    $manuscript->photo = $photo_path; 
        }
                $manuscript->title = $request->request->get('title');
                $manuscript->sypnosis = $request->request->get('sypnosis');
                $manuscript->authorID = $request->request->get('authorID');
                $manuscript->publisherID = $request->request->get('publisherID');
                $manuscript->genreID = $request->request->get('genreID');
                $manuscript->status = $request->request->get('status');
                $manuscript->save();
    }

    public function getPendingManuscripts(){
        $manuscript = DB::table('manuscripts')
            ->join('users', 'users.id', '=', 'manuscripts.authorID')
            ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
            ->select('*', 
            'manuscripts.created_at as publishedDate',
            'manuscripts.id as manuscriptID',
            'manuscripts.status as manuscriptStatus')
            ->where('manuscripts.status',1)
            ->orWhere('manuscripts.status',2)
            ->get();
            return $manuscript;
    }

    public function delete(){
        $id = $_GET['id'];
        Manuscript::find($id)->delete();
    }

    public function sortBy(){
        $sort = $_GET['sort'];
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
        ->join('users', 'users.id', '=', 'manuscripts.authorID')
        ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
        ->select('*', 
        'manuscripts.created_at as publishedDate',
        'manuscripts.id as manuscriptID')
        ->where([
            ['manuscripts.publisherID', '=', $id],
            ['manuscripts.status','=',0]
        ])
        ->orderBy('manuscripts.title', $sort)
        ->get();
        return $manuscript;
    }

    public function sortByGenre(){
        $sort = $_GET['sort'];
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
        ->join('users', 'users.id', '=', 'manuscripts.authorID')
        ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
        ->select('*', 
        'manuscripts.created_at as publishedDate',
        'manuscripts.id as manuscriptID')
        ->where([
            ['manuscripts.publisherID', '=', $id],
            ['manuscripts.genreID','=',$sort]
        ])
        ->get();
        return $manuscript;
    }

    public function searchManuscript(){
        $sort = $_GET['sort'];
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
        ->join('users', 'users.id', '=', 'manuscripts.authorID')
        ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
        ->select('*', 
        'manuscripts.created_at as publishedDate',
        'manuscripts.id as manuscriptID')
        ->where([
            ['manuscripts.publisherID', '=', $id],
            ['manuscripts.title','LIKE', '%'.$sort.'%']
        ])
        ->get();
        return $manuscript;
    }

    public function sortByAuth(){
        $sort = $_GET['sort'];
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
        ->join('users', 'users.id', '=', 'manuscripts.authorID')
        ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
        ->select('*', 
        'manuscripts.created_at as publishedDate',
        'manuscripts.id as manuscriptID')
        ->where([
            ['manuscripts.authorID', '=', $id],
            ['manuscripts.status','=',0]
        ])
        ->orderBy('manuscripts.title', $sort)
        ->get();
        return $manuscript;
    }

    public function sortByAuthGenre(){
        $sort = $_GET['sort'];
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
        ->join('users', 'users.id', '=', 'manuscripts.authorID')
        ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
        ->select('*', 
        'manuscripts.created_at as publishedDate',
        'manuscripts.id as manuscriptID')
        ->where([
            ['manuscripts.authorID', '=', $id],
            ['manuscripts.genreID','=',$sort]
        ])
        ->get();
        return $manuscript;
    }

    public function searchAuthManuscript(){
        $sort = $_GET['sort'];
        $id = $_GET['id'];
        $manuscript = DB::table('manuscripts')
        ->join('users', 'users.id', '=', 'manuscripts.authorID')
        ->join('genres', 'genres.id', '=', 'manuscripts.genreID')
        ->select('*', 
        'manuscripts.created_at as publishedDate',
        'manuscripts.id as manuscriptID')
        ->where([
            ['manuscripts.authorID', '=', $id],
            ['manuscripts.title','LIKE', '%'.$sort.'%']
        ])
        ->get();
        return $manuscript;
    }
}
