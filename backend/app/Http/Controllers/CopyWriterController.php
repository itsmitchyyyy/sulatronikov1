<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CopyWriterController extends Controller
{
    //
    public function create(Request $request){
        DB::table('copy_writer_assign')
            ->insert($request);
    }
}
