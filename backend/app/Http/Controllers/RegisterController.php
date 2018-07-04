<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTFactory;
use JWTAuth;
use Validator;
use Response;
class RegisterController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string', 
            'username' => 'required|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|max:8',
            'lastName' => 'required|string', 
            'contact' => 'required',
            'company' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zipcode' => 'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        User::create([
            'firstName' => $request->get('firstName'), 
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => $request->get('password'),
            'lastName' => $request->get('lastName'), 
            'contact' => $request->get('contact'),
            'company' => $request->get('company'),
            'city' => $request->get('city'),
            'state' => $request->get('state'),
            'zipcode' => $request->get('zipcode'),
        ]);
        $user = User::first();
        $token = JWTAuth::fromUser($user);

        return Response::json(compact('token'));
    }
}
