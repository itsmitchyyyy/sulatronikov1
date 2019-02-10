<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Input;
use Carbon\Carbon;
use Response;

class CopyWriterController extends Controller
{
    //
    public function create(Request $request){
        if(Input::hasFile('attachment')){
            $messageContent = Input::file('attachment');
            $messageContent->move('docs', $messageContent->getClientOriginalName());
            $docs_path = "http://127.0.0.1:8000/docs/".$messageContent->getClientOriginalName();
        }else{
            $docs_path = null;
        }

        DB::table('copy_writer_assign')
        ->insert([
            'copywriterId' => $request->request->get('copywriterId'),
            'authorId' => $request->request->get('authorId'),
            'genreId' => $request->request->get('genreID'),
            'title' => $request->request->get('title'),
            'attachment' => $docs_path,
            'status' => $request->request->get('status'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }

    public function getAssignManuscripts() {
        $id = $_GET['id'];
        $manuscripts = DB::table('copy_writer_assign as c')
            ->join('genres as g', 'g.id' ,'=', 'c.genreId')
            ->join('users as copy', 'copy.id', '=', 'c.copywriterId')
            ->join('users as author', 'author.id', '=', 'c.authorId')
            ->select('*',
            'copy.firstName as copyWriterFirstName',
            'copy.lastName as copyWriterLastName',
            'copy.username as copyWriterUsername',
            'c.attachment as copyWriterAttachment',
            'author.firstName as authorFirstName',
            'author.lastName as authorLastName')
            ->where('copywriterId', $id)
            ->get();
        
        return $manuscripts;
    }
}
