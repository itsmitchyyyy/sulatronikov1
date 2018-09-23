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

    public function allPublisher(){
        $user = User::whereHas('roles', function($q){
            $q->where('name','publisher');
        })->get();
        return $user;
    }

    public function update(Request $request){
        $user = User::find($request->id)->update($request->except(['id']));
        return response()->json($user);
    }

    public function search(){
        $term = $_GET['search'];
        $user = User::where(DB::raw('CONCAT(firstName," ",lastName)'), 'LIKE', '%'.$term.'%')->get();
        return $user;
    }

}
