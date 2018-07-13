<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Role;
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
            'password' => 'required',
            'lastName' => 'required|string', 
            'contact' => 'required',
            'company' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zipcode' => 'required',
            'role' => 'required|min:author,writers,publisher',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $role = $request->get('role');
        User::create([
            'firstName' => $request->get('firstName'), 
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => $request->get('password'),
            'lastName' => $request->get('lastName'), 
            'contact' => $request->get('contact'),
            'company' => $request->get('company'),
            'address' => $request->get('address'),
            'city' => $request->get('city'),
            'state' => $request->get('state'),
            'zipcode' => $request->get('zipcode'),
        ])->roles()->attach(Role::where('name', $role)->first());
        $user = User::first();
        // $user->roles()->attach(Role::where('name', $role)->first());
        $token = JWTAuth::fromUser($user);

        return Response::json(compact('token'));
    }
}
