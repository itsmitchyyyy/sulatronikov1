import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../../../shared/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  fakeArray = new Array(5);
  id: number;
  private subscription = new Map<String, Subscription>();
  authors: any;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private logInService: LoginService
  ) { }

  ngOnInit() {
    this.subscription.set('routeSub', this.route
      .params.subscribe(param => {
        this.id = +param['id'];
      }));
    this.getProfile();
    this.currentLoggedIn();
  }

  currentLoggedIn() {
    this.subscription.set('loggedSub', this.logInService
      .getLoggedIn()
      .subscribe(res => {
        this.currentUser = res;
      }));
  }

  getProfile() {
    this.subscription.set('authorSub', this.userService
      .getUser(this.id)
      .subscribe(res => {
        this.authors = res;
      }));
  }

  get messageRoute() {
    if (this.currentUser) {
      return `/${this.currentUser.roles[0].name}s/profile` 
    }
  }

  get userRole() {
    if (this.authors) {
      return this.authors.roles[0].name;
    }
    return 'None';
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
