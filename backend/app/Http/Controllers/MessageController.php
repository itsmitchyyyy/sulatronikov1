<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use DB;
use Illuminate\Support\Facades\Input;
class MessageController extends Controller
{
    //
    public function create(Request $request){
        if(Input::hasFile('attachment')){
            $messageContent = Input::file('attachment');
            $messageContent->move('docs', $messageContent->getClientOriginalName());
            $docs_path = "http://127.0.0.1:8000/docs/".$messageContent->getClientOriginalName();
        }else{
            $docs_path = null;
        }
        $message = new Message();
        $message->subject = $request->request->get('subject');
        $message->attachment = $docs_path;
        $message->content = $request->request->get('content');
        $message->recepientID = $request->request->get('recepientID');
        $message->senderID = $request->request->get('senderID');
        $message->save();
           
    }

    public function getMessages(){
        $id = $_GET['id'];
        $message = DB::table('messages')
            ->join('users as recepient', 'recepient.id', '=', 'messages.recepientID')
            ->join('users as sender', 'sender.id', '=', 'messages.senderID')
            ->select('*', 
            'recepient.firstName as recepientFirstName', 
            'recepient.lastName as recepientLastName', 
            'recepient.id as repID',
            'recepient.avatar as recepientAvatar', 
            'sender.firstName as senderFirstName', 
            'sender.lastName as senderLastName', 
            'sender.id as sendID',
            'sender.avatar as senderAvatar',
            'messages.updated_at as messageDate',
            'messages.id as messageID')
            ->where('messages.recepientID', $id)
            ->groupBy('messages.recepientID', 'messages.senderID')
            ->orderByDesc('messages.created_at')
            ->get();
        return $message;
    }

    public function getMessage(){
       $id = $_GET['id'];
       $secondary = $_GET['secondary'];
       $message = DB::table('messages')
           ->join('users as recepient', 'recepient.id', '=', 'messages.recepientID')
           ->join('users as sender', 'sender.id', '=', 'messages.senderID')
           ->select('*', 
           'recepient.firstName as recepientFirstName', 
           'recepient.lastName as recepientLastName', 
           'recepient.id as repID',
           'recepient.avatar as recepientAvatar',
           'messages.updated_at as messageDate',
           'messages.id as messageID')
           ->where('messages.recepientID', $id)
           ->orWhere('messages.recepientID', $secondary)
           ->where('messages.senderID', $secondary)
           ->orWhere('messages.senderID', $id)
           ->get(); 
        return $message;
    }

    public function getReplies(){
        $id = $_GET['id'];
        $replies = DB::table('replies')
            ->join('messages', 'messages.id' , '=', 'replies.messageID')
            ->join('users as recepient', 'recepient.id', '=', 'messages.recepientID')
            ->join('users as sender', 'sender.id', '=', 'messages.senderID')
            ->select('*', 
            'recepient.firstName as recepientFirstName', 
            'recepient.lastName as recepientLastName', 
            'recepient.id as repID',
            'recepient.avatar as recepientAvatar',
            'messages.updated_at as messageDate',
            'messages.id as messageID')
            ->where('replies.messageID', $id)
            ->orWhere('messages.senderID', $id)
            ->orderByDesc('messages.recepientID')
            ->orderByDesc('messages.senderID')
            ->get(); 
            return $replies;
    }

    public function replyMessage(Request $request){
       if(Input::hasFile('attachment')){
        $attachment = Input::file('attachment');
        $attachment->move('docs', $attachment->getClientOriginalName());
        $docs_path = "http://127.0.0.1:8000/docs/".$attachment->getClientOriginalName();
       }else{
       $docs_path = null;
       }
        DB::table('replies')
        ->insert([
            'repContent' => $request->request->get('content'),
            'repAttachment' => $docs_path,
            'messageID' => $request->request->get('messageID'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }

}
