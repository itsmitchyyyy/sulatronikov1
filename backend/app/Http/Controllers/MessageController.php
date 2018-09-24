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
        $verify = Message::where([
            ['senderID','=', $request->request->get('senderID')],
            ['recepientID','=', $request->request->get('recepientID')]
        ])->exists();
        if($verify){
            $this.replyMessage($request);
        }else{
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
            ->orWhere('messages.senderID', $id)
            ->groupBy('messages.recepientID', 'messages.senderID')
            ->orderByDesc('messages.created_at')
            ->get();
        return $message;
    }

    public function getMessage(){
       $id = $_GET['id'];
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
           ->where('messages.id', $id)
           ->get(); 
        return $message;
    }

    public function getReplies(){
        $id = $_GET['id'];
        $replies = DB::table('replies')
            ->join('users as recepient', 'recepient.id', '=', 'replies.recipientID')
            ->join('users as sender', 'sender.id', '=', 'replies.senderID')
            ->select('*', 
            'recepient.firstName as recepientFirstName', 
            'recepient.lastName as recepientLastName', 
            'recepient.id as repID',
            'recepient.avatar as recepientAvatar',
            'replies.updated_at as messageDate',
            'replies.id as messageID')
            ->where('replies.messageID', $id)
            ->orderBy('replies.created_at', 'ASC')
            ->get(); 
            return response()->json($replies);
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
            'recipientID' => $request->request->get('recepientID'),
            'senderID' => $request->request->get('senderID'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }

}
