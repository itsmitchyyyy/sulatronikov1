import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../message.service';
import { SharedService } from '../../../../../shared/shared.service';
import { UserService } from '../../../user.service';
import { LoginService } from '../../../../../shared/login/login.service';

@Component({
  selector: 'app-copywritermessage',
  templateUrl: './copywritermessage.component.html',
  styleUrls: ['./copywritermessage.component.scss']
})
export class CopywritermessageComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  formGroup: FormGroup;
  attachment: File;
  isSending: boolean;
  authID: number;
  publisher: any;
  messages: any;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private sharedService: SharedService,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
        if (params.hasOwnProperty('authID')) {
          this.authID = +params['authID'];
        }
      }));
    this.formGroup = this.fb.group({
      'subject': null,
      'content': null,
      'recepient': null,
      'attachment': null,
    });
    this.getMessages();
    this.getLoggedIn();
    if (this.authID) {
      this.getAuthor();
    }
  }

  getLoggedIn() {
    this.subscription.set('loggedUserSubscription', this.loginService
      .getLoggedIn()
      .subscribe(res => {
        this.currentUser = res;
      }));
  }

  validateSender(id) {
    if (this.currentUser) {
      if (id === this.currentUser.id) {
        return true;
      }
    }
    return false;
  }

  getMessages() {
    this.subscription.set('messageSubscription', this.messageService
      .getMessages(this.id)
      .subscribe(res => {
        this.messages = res;
      }));
  }

  getAuthor() {
    this.subscription.set('publisherSubscription', this.userService
      .getUser(this.authID)
      .subscribe(res => {
        this.publisher = res;
        this.formGroup.get('recepient').setValue(`${res.firstName} ${res.lastName}`);
      }));
  }

  addAttachment(event) {
    if (event.target.files.length > 0) {
      this.attachment = event.target.files[0];
      this.formGroup.get('attachment').setValue(this.attachment);
    }
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
        window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
        this.getMessages();
      }))

  }

  private prepareSave() {
    let data = new FormData();
    if (this.attachment) {
      data.append('attachment', this.attachment, this.attachment.name);
    }
    data.append('subject', this.formGroup.get('subject').value);
    data.append('content', this.formGroup.get('content').value);
    data.append('recepientID', `${this.authID}`);
    data.append('senderID', `${this.id}`);
    return data;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
