<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Role;
use Hash;
use Auth;
use JWTFactory;
use JWTAuth;
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
    public function get(Request $request){
        $user = User::find($request->id)->load('roles');
        return $user;
    }

    public function update(Request $request){
        $user = User::find($request->id)->update($request->except(['id']));
        return response()->json($user);
    }

}
