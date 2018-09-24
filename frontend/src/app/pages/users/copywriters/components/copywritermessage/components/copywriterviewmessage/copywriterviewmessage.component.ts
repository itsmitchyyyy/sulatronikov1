import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../../message.service';
import { SharedService } from '../../../../../../../shared/shared.service';
import { UserService } from '../../../../../user.service';
import { LoginService } from '../../../../../../../shared/login/login.service';

@Component({
  selector: 'app-copywriterviewmessage',
  templateUrl: './copywriterviewmessage.component.html',
  styleUrls: ['./copywriterviewmessage.component.scss']
})
export class CopywriterviewmessageComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  formGroup: FormGroup;
  attachment: File;
  isSending: boolean;
  authID: number;
  mesID: number;
  user: any;
  messages: any;
  currentUser: any;
  conversations: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private sharedService: SharedService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
        if (params.hasOwnProperty('authID')) {
          this.authID = +params['authID'];
        }
        if (params.hasOwnProperty('mesID')) {
          this.mesID = +params['mesID'];
        }

        this.getMessages();
        this.getMessage();
        if (this.authID) {
          this.getAuthor();
        }
      }));
    this.formGroup = this.fb.group({
      'content': null,
      'attachment': null,
    });
    
    this.getLoggedIn();
  }

  getLoggedIn() {
    this.subscription.set('loggedUserSubscription', this.userService
      .getUser(this.id)
      .subscribe(res => {
        this.currentUser = res;
      }));
  }

  getMessages() {
    this.subscription.set('messagesSubscription', this.messageService
      .getMessages(this.id)
      .subscribe(res => {
        this.messages = res;
      }));
  }

  getMessage() {
    this.subscription.set('messageSubscription', this.messageService
      .getMessage(this.mesID)
      .subscribe(res => {
        this.conversations = res;
      }));
  }

  getAuthor() {
    this.subscription.set('publisherSubscription', this.userService
      .getUser(this.authID)
      .subscribe(res => {
        this.user = res;
      }));
  }

  addAttachment(event) {
    if (event.target.files.length > 0) {
      this.attachment = event.target.files[0];
      this.formGroup.get('attachment').setValue(this.attachment);
    }
  }

  validateUser(id){
    if(id === this.currentUser.id){
      return true;
    }
    return false;
  }

  submitMessage() {
    this.isSending = true;
    const messageData = this.prepareSave();
    this.subscription.set('messageSubscription', this.messageService
      .addMessage(messageData)
      .subscribe(() => {
        this.isSending = false;
        this.sharedService.openSnackBar('Message sent', null, { duration: 2000 })
        this.formGroup.reset();
        this.attachment = null;
        this.getMessages();
      }))

  }

  private prepareSave() {
    let data = new FormData();
    if (this.attachment) {
      data.append('attachment', this.attachment, this.attachment.name);
    }
    if (this.formGroup.get('content').value !== null) {
      data.append('content', this.formGroup.get('content').value);
    }
    data.append('recepientID', `${this.authID}`);
    data.append('senderID', `${this.id}`);
    return data;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }


}
