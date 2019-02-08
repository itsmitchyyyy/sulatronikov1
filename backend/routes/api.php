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
//USER CONTROLLER
Route::post('addProfilePic', 'UserController@profile');
Route::post('updateStatus', 'UserController@updateStatus');
Route::post('deleteUser', 'UserController@deleteUser');
Route::get('allPublisher', 'UserCOntroller@allPublisher');
Route::get('allUser', 'UserController@show');
Route::get('allAuthor', 'UserCOntroller@allAuthor');
Route::get('getUser', 'UserController@get');
Route::post('addCopyWriter', 'UserController@addCopyWriter');
Route::post('addCopyWriterPub', 'UserController@addCopyWriterPub');
Route::get('allCopyPub', 'UserController@allCopyPub');
Route::get('allCopyWriters', 'UserController@allCopyWriter');
Route::post('updateUser', 'UserController@update');
Route::post('updatePassword', 'UserController@updatePassword');
Route::get('searchUser', 'UserController@search');
Route::get('searchPublisher', 'UserController@searchPublisher');
Route::get('search', 'UserController@searchUsers');

//GENRE CONTROLLER
Route::get('allGenre', 'GenreController@all');
Route::get('findGenre', 'GenreController@find');

//MESSAGE CONTROLLER
Route::post('addMessage', 'MessageController@create');
Route::post('replyMessage', 'MessageController@replyMessage');
Route::get('getReplies', 'MessageController@getReplies');
Route::get('getMessage', 'MessageController@getMessages');
Route::get('messageConversation', 'MessageController@getMessage');
Route::get('conversationList', 'MessageController@getConversation');
Route::get('lastConversation', 'MessageController@lastConversation');
Route::get('messageConversationList', 'MessageController@messageConversation');

//MANUSCRIPT CONTROLLER
Route::post('addManuscript', 'ManuscriptController@create');
Route::get('getManuscript', 'ManuscriptController@get');
Route::get('editManuscript', 'ManuscriptController@edit');
Route::post('updateManuscript', 'ManuscriptController@update');
Route::get('authorManuscript', 'ManuscriptController@authorManuscriptUnpublished');
Route::get('deleteManuscript' ,'ManuscriptController@delete');
Route::get('sortManuscript', 'ManuscriptController@sortBy');
Route::get('sortManuscriptGenre', 'ManuscriptController@sortByGenre');
Route::get('searchManuscript', 'ManuscriptController@searchManuscript');
Route::get('sortAuthManuscript', 'ManuscriptController@sortByAuth');
Route::get('sortAuthManuscriptGenre', 'ManuscriptController@sortByAuthGenre');
Route::get('searchAuthManuscript', 'ManuscriptController@searchAuthManuscript');
Route::get('publishedGet', 'ManuscriptController@publishedGet');
Route::get('authorManuscriptPublished', 'ManuscriptController@authorManuscriptPublished');
Route::get('pendingManuscripts', 'ManuscriptController@getPendingManuscripts');
Route::get('publishBook', 'ManuscriptController@publishBook');
Route::get('allBooks', 'ManuscriptController@allBooks');