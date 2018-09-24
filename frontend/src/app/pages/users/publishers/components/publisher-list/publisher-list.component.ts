import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user.service';
import { LoginService } from '../../../../../shared/login/login.service';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss']
})
export class PublisherListComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  publisher: any;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route
      .params.subscribe(param => {
        this.id = +param['id'];
      }));
    this.userLogged();
    this.publisherProfile();
  }

  publisherProfile() {
    this.subscription.set('publisherSubscription', this.userService
      .getUser(this.id).subscribe(res => {
        this.publisher = res;
      }));
  }

  userLogged() {
    this.subscription.set('userSubscription', this.loginService
      .getLoggedIn().subscribe(res => {
        this.currentUser = res;
      }));
  }

  get messageRoute() {
    if (this.currentUser) {
      return `/${this.currentUser.roles[0].name}s/profile` 
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
