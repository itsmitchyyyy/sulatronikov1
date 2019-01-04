import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../../message.service';
import { SharedService } from '../../../../../../../shared/shared.service';
import { UserService } from '../../../../../user.service';
import { LoginService } from '../../../../../../../shared/login/login.service';
import { throttleTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-authorviewmessage',
  templateUrl: './authorviewmessage.component.html',
  styleUrls: ['./authorviewmessage.component.scss']
})
export class AuthorviewmessageComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  formGroup: FormGroup;
  attachment: File;
  isSending: boolean;
  pubID: number;
  mesID: number;
  uid: number;
  publisher: any;
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
        if (params.hasOwnProperty('pubID')) {
          this.pubID = +params['pubID'];
        }
        if (params.hasOwnProperty('mesID')) {
          this.mesID = +params['mesID'];
        }
        if (params.hasOwnProperty('uid')) {
          this.uid = +params['uid'];
        }

        this.getMessages();
        this.getMessage();
        this.getLoggedIn();
        if (this.pubID) {
          this.getPublisher();
        }
      }));
    this.formGroup = this.fb.group({
      'content': null,
      'attachment': null,
    });
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
      .getMessages(this.uid)
      .subscribe(res => {
        this.messages = res;
      }));
  }

  getMessage() {
    this.subscription.set('messageSubscription', this.messageService
      .getMessage({ uid: this.uid})
      .subscribe(res => {
        this.conversations = res;
      }));
  }

  getPublisher() {
    this.subscription.set('publisherSubscription', this.userService
      .getUser(this.pubID)
      .subscribe(res => {
        this.publisher = res;
      }));
  }

  addAttachment(event) {
    if (event.target.files.length > 0) {
      this.attachment = event.target.files[0];
      this.formGroup.get('attachment').setValue(this.attachment);
    }
  }

  validateSender(id) {
    if (this.currentUser) {
      if (id === this.currentUser.id) {
        return true;
      }
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
        this.getMessage();
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
    data.append('recepientID', `${this.pubID}`);
    data.append('senderID', `${this.id}`);
    data.append('uid', `${this.uid}`);
    return data;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
