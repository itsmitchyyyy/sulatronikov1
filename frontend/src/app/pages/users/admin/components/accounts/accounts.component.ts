import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  users: any;

  private subscription = new Map<String, Subscription>();
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.allUsers();
  }

  allUsers() {
    this.subscription.set('userSub', this.userService
      .allUser()
      .subscribe(res => {
        this.users = res;
      }))
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
