import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from '../../../message.service';
import { SharedService } from '../../../../../shared/shared.service';
import { UserService } from '../../../user.service';
import { LoginService } from '../../../../../shared/login/login.service';
import { FilevalidatorDirective } from 'src/app/shared/filevalidator.directive';

@Component({
  selector: 'app-authormessage',
  templateUrl: './authormessage.component.html',
  styleUrls: ['./authormessage.component.scss']
})
export class AuthormessageComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  formGroup: FormGroup;
  attachment: File;
  isSending: boolean;
  pubID: number;
  publisher: any;
  messages: any;
  currentUser: any;
  searchedPublisher: any;
  isSearching: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private sharedService: SharedService,
    private userService: UserService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
        if (params.hasOwnProperty('pubID')) {
          this.pubID = +params['pubID'];
        }
      }));
    this.formGroup = this.fb.group({
      'subject': null,
      'content': null,
      'recepient': null,
      'attachment': new FormControl("", [FilevalidatorDirective.validate]),
    });
    this.getMessages();
    this.getLoggedIn();
    if (this.pubID) {
      this.getPublisher();
    }
  }

  getLoggedIn() {
    this.subscription.set('loggedUserSubscription', this.loginService
      .getLoggedIn()
      .subscribe(res => {
        this.currentUser = res;
      }));
  }

  searchPublisher(term) {
    this.isSearching = true;
    this.subscription.set('searchPublisherSubscription', this.messageService
      .search(term)
      .subscribe(res => {
        this.isSearching = false;
        if (res.length == []) {
          this.searchedPublisher = null;
          return;
        }
        this.searchedPublisher = res;
      }));
  }

  selectPublisher(data) {
    this.formGroup.get('recepient').setValue(`${data.firstName} ${data.lastName}`);
    this.pubID = data.id;
    this.searchedPublisher = null;
  }

  getMessages() {
    this.subscription.set('messageSubscription', this.messageService
      .getMessages(this.id)
      .subscribe(res => {
        this.messages = res;
      }));
  }

  getPublisher() {
    this.subscription.set('publisherSubscription', this.userService
      .getUser(this.pubID)
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
    if (id == this.id) {
      return true;
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
    data.append('recepientID', `${this.pubID}`);
    data.append('senderID', `${this.id}`);
    data.append('uid', `${this.id}${this.pubID}`);
    return data;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
