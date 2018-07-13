<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use JWTFactory;
use JWTAuth;
use App\User;
use Illuminate\Support\Facades\Auth;
class LoginController extends Controller
{
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $credentials = $request->only('username','password');
        try {
            if(! $token = JWTAuth::attempt($credentials)){
                return response()->json(['error' => 'invalid credentials'], 401);
            }
        } catch(JWTException $e){
            return response()->json(['error' => 'could not create token'], 500);
        }
        return response()->json(compact('token'));
    }

    public function logout(Request $request){
        $this->validate($request, ['token' => 'required']);
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json(['success' => true, 'message' => 'Logout successfully']);
        } catch(JWTException $e){
            return response()->json(['success' => false, 'error' => 'Failed to logout, please try again'], 500);
        }
    }

    public function getUser(Request $request){
        return $request->user()->load('roles');
    }
}
