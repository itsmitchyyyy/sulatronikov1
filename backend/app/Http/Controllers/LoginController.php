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
            'password' => 'required|max:10',
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
}
