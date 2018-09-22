<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('jwt.auth')->get('/user', function (Request $request) {
//     return $request->user()->load('roles');
// });
Route::group(['middleware' => ['jwt.auth']], function(){
    Route::get('user', 'LoginController@getUser');
    Route::get('logout', 'LoginController@logout');
});
Route::post('user/register', 'RegisterController@register');
Route::post('user/login', 'LoginController@login');
Route::get('getUser', 'UserController@get');
Route::post('updateUser', 'UserController@update');
Route::post('updatePassword', 'UserController@updatePassword');
Route::post('addManuscript', 'ManuscriptController@create');