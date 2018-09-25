<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Role;
use Hash;
use Auth;
use JWTFactory;
use JWTAuth;
use DB;
use Illuminate\Support\Facades\Input;
class UserController extends Controller
{
    //

    public function updatePassword(Request $request){
        $user = JWTAuth::toUser($request->token);
        if(Hash::check($request->password, $user->password)){
            $user->password = Hash::make($request->newPassword);
            $user->save();
            return 'Done';
        }
    }

    public function profile(Request $request){
        $user = JWTAuth::toUser($request->token);
        $avatar = Input::file('avatar');
        $avatar->move('uploads', $avatar->getClientOriginalName());
        $image_path = "http://127.0.0.1:8000/uploads/". $avatar->getClientOriginalName();
        $user->avatar = $image_path;
        $user->save();
    }
    public function get(Request $request){
        $user = User::find($request->id)->load('roles');
        return $user;
    }

    public function show(){
        $user = User::whereHas('roles', function($q){
            $q->where('name', 'publisher')
            ->orWhere('name', 'author');
        })->get()->load('roles');
        return $user;
    }

    public function allPublisher(){
        $user = User::whereHas('roles', function($q){
            $q->where('name','publisher');
        })->get();
        return $user;
    }

    public function allAuthor(){
        $user = User::whereHas('roles', function($q){
            $q->where('name','author');
        })->get();
        return $user;
    }

    public function addCopyWriter(Request $request){
        $user = new User();
        if(Input::hasFile('avatar')){
            $messageContent = Input::file('avatar');
            $messageContent->move('docs', $messageContent->getClientOriginalName());
            $docs_path = "http://127.0.0.1:8000/uploads/".$messageContent->getClientOriginalName();
        }else{
            $docs_path = null;
        }
        $user->avatar = $docs_path;
        $user->username = $request->request->get('userName');
        $user->password = Hash::make($request->request->get('userName'));
        $user->email = $request->request->get('userName').'@sulatroniko.com';
        $user->firstName = $request->request->get('firstName');
        $user->lastName = $request->request->get('lastName');
        $user->biography = $request->request->get('biography');
        $user->specialization = $request->request->get('genreID');
        $user->save();
        $user->roles()->attach(Role::where('name', $request->request->get('role'))->first());
        return $user->id;
    }

    public function update(Request $request){
        $user = User::find($request->id)->update($request->except(['id']));
        return response()->json($user);
    }

    public function search(){
        $term = $_GET['search'];
        $user = User::where(DB::raw('CONCAT(firstName," ",lastName)'), 'LIKE', '%'.$term.'%')
        ->get()
        ->load('roles');
        return $user;
    }

    public function addCopyWriterPub(Request $request){
        DB::table('copywriterspub')
            ->insert([
                'userId' => $request->id,
                'pubId' => $request->pubId,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]);
    }

    public function allCopyPub(){
        $id = $_GET['id'];
        $copyWriter = DB::table('copywriterspub')
            ->join('users as user', 'user.id' ,'=', 'copywriterspub.userId')
            ->join('users as publisher', 'publisher.id', '=','copywriterspub.pubId')
            ->select('*',
            'publisher.firstName as publisherFirstName',
            'publisher.lastName as publisherLastName',
            'publisher.id as publisherId',
            'user.firstName as userFirstName',
            'user.lastName as userLastName',
            'user.id as userId')
            ->where('copywriterspub.pubId', $id)
            ->get();
        return $copyWriter;
    }

    public function allCopyWriter(){
        $copyWriter = DB::table('copywriterspub')
            ->join('users as user', 'user.id' ,'=', 'copywriterspub.userId')
            ->join('users as publisher', 'publisher.id', '=','copywriterspub.pubId')
            ->select('*',
            'publisher.firstName as publisherFirstName',
            'publisher.lastName as publisherLastName',
            'publisher.id as publisherId',
            'user.firstName as userFirstName',
            'user.lastName as userLastName',
            'user.id as userId')
            ->get();
        return $copyWriter;
    }

    public function updateStatus(Request $request){
        User::find($request->id)->update($request->except(['id']));
    }

    public function deleteUser(Request $request){
        User::find($request->id)->delete();
    }

}
