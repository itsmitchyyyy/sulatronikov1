<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use DB;
use Carbon\Carbon;
use Response;
use Illuminate\Support\Facades\Input;
class MessageController extends Controller
{
    //
    public function create(Request $request){

        $message = DB::table('messages')
        ->where(['user_one' => $request->request->get('senderID'), 'user_two' => $request->request->get('recepientID')])
        ->orWhere(['user_one' => $request->request->get('recepientID'), 'user_two' => $request->request->get('senderID')])
        ->first();

        $messageId = null;

        if ($message == null){
            $messageId = Message::insertGetId([
            'user_one' => $request->request->get('senderID'),
            'user_two' => $request->request->get('recepientID'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        } else {
        $messageId = $message->id;
    }   
            if(Input::hasFile('attachment')){
                $messageContent = Input::file('attachment');
                $messageContent->move('docs', $messageContent->getClientOriginalName());
                $docs_path = "http://127.0.0.1:8000/docs/".$messageContent->getClientOriginalName();
            }else{
                $docs_path = null;
            }

            DB::table('message_reply')
                ->insert([
                    'subject' => $request->request->get('subject'),
                    'attachment' => $docs_path,
                    'content' => $request->request->get('content'),
                    'user_id' => $request->request->get('recepientID'),
                    'message_id' => $messageId,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);
      

    

        /* Message::create([
            'subject' => $request->request->get('subject'),
            'attachment' => $docs_path,
            'content' => $request->request->get('content'),
            'recepientID' => $request->request->get('recepientID'),
            'senderID' => $request->request->get('senderID')
        ]) */
        // $message = new Message();
        // $message->subject = $request->request->get('subject');
        // $message->attachment = $docs_path;
        // $message->content = $request->request->get('content');
        // $message->recepientID = $request->request->get('recepientID');
        // $message->senderID = $request->request->get('senderID');
        // $message->uid = 'message-'.$request->request->get('uid');
        // $message->save();
    }

    public function getConversation(){
        $id = $_GET['id'];
        $conversation = DB::table('users')
         ->join('message_reply as reply', 'reply.user_id', '=', 'users.id')
         ->join('messages as message', 'message.id', '=', 'reply.message_id')
         ->select('*', DB::raw('CASE WHEN message.user_one = '.$id.' THEN message.user_two = users.id
         WHEN message.user_two = '.$id.' THEN message.user_one = users.id END AND message.id = reply.message_id
         AND (message.user_one = '.$id.' OR message.user_two = '.$id.')'))
         ->orderByDesc('message.id')
         ->get();

         return $conversation;
    }

    public function lastConversation(){

        $id = $_GET['id'];
        $conversation =  DB::table('message_reply')
          ->where('message_reply.message_id', $id)
          ->join('messages as message', 'message.id', '=', 'message_reply.message_id')
          ->join('users as recepient', 'recepient.id', '=', 'message.user_two')
          ->join('users as sender', 'sender.id', '=', 'message.user_one')
          ->select('*', 
          'sender.firstName as senderfirstName',
          'sender.lastName as senderlastName',
          'sender.avatar as senderavatar',
          'sender.id as senderID',
          'recepient.firstName as recepientfirstName',
          'recepient.lastName as recepientlastName',
          'recepient.avatar as recepientavatar',
          'recepient.id as recepientID',
          'message_reply.created_at as lastSentDate',)
          ->orderBy('message_reply.id', 'DESC')
          ->limit(1)
          ->get();

         return $conversation;
    }
    public function getMessages(){
        $id = $_GET['id'];
        $user = DB::table('messages')
            ->join('users as recepient', 'recepient.id', '=', 'messages.recepientID')
            ->join('users as sender', 'sender.id', '=', 'messages.senderID')
            ->where('messages.senderID',$id)
            ->orWhere('messages.recepientID', $id)
            ->first();

        $message = DB::table('messages')
            ->join('users as recepient', 'recepient.id', '=', 'messages.recepientID')
            ->join('users as sender', 'sender.id', '=', 'messages.senderID')
            ->where('messages.uid', 'message-12')
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
            'messages.id as messageID',
             DB::raw('MAX(messages.content) as lastSentMessage, 
             MAX(messages.created_at) as lastSentDate'))
            ->groupBy('messages.uid')
            ->get();
        // $message = DB::table('messages')
        //     ->join('users as recepient', 'recepient.id', '=', 'messages.recepientID')
        //     ->join('users as sender', 'sender.id', '=', 'messages.senderID')
        //     ->select('*', 
        //     'recepient.firstName as recepientFirstName', 
        //     'recepient.lastName as recepientLastName', 
        //     'recepient.id as repID',
        //     'recepient.avatar as recepientAvatar', 
        //     'sender.firstName as senderFirstName', 
        //     'sender.lastName as senderLastName', 
        //     'sender.id as sendID',
        //     'sender.avatar as senderAvatar',
        //     'messages.updated_at as messageDate',
        //     'messages.id as messageID',
        //      DB::raw('MAX(messages.content) as lastSentMessage, 
        //      MAX(messages.created_at) as lastSentDate'))
        //      ->where('messages.senderID',$id)
        //      ->orWhere('messages.recepientID', $id)
        //      ->groupBy('messages.uid')
        //      ->get();
        return $message;
    }

    public function getMessage(){
       $uid = $_GET['uid'];
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
           ->where('messages.uid', $uid)
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
