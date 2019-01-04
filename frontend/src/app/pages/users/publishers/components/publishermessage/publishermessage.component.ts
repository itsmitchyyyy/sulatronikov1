import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user.service';
import { SharedService } from '../../../../../shared/shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../message.service';
import { LoginService } from '../../../../../shared/login/login.service';
import { PublisherService } from '../../publisher.service';

@Component({
  selector: 'app-publishermessage',
  templateUrl: './publishermessage.component.html',
  styleUrls: ['./publishermessage.component.scss']
})
export class PublishermessageComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  formGroup: FormGroup;
  attachment: File;
  isSending: boolean;
  authID: number;
  publisher: any;
  messages: any;
  currentUser: any;
  searchedUser: any;
  isSearching: boolean;
  userID: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private sharedService: SharedService,
    private userService: UserService,
    private publisherService: PublisherService,
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

  search(term) {
    this.isSearching = true;
    this.subscription.set('searchUserSubscription', this.publisherService
      .searchUser(term)
      .subscribe(res => {
        this.isSearching = false;
        if (res.length == []) {
          this.searchedUser = null;
          return;
        }

        this.searchedUser = res;
      }));
  }

  selectUser(data) {
    this.formGroup.get('recepient').setValue(`${data.firstName} ${data.lastName}`);
    this.userID = data.id;
    this.searchedUser = null;
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

  validateSender(id) {
    if (this.currentUser) {
      if (id == this.currentUser.id) {
        return true;
      }
    }
    return false;
  }

  private prepareSave() {
    let data = new FormData();
    if (this.attachment) {
      data.append('attachment', this.attachment, this.attachment.name);
    }
    data.append('subject', this.formGroup.get('subject').value);
    data.append('content', this.formGroup.get('content').value);
    data.append('recepientID', `${this.userID}`);
    data.append('senderID', `${this.id}`);
    return data;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
