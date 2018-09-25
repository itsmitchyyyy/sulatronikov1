import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  users: any;

  private subscription = new Map<String, Subscription>();
  constructor(
    private userService: UserService,
    private sharedService: SharedService) { }

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

  updateStatus(id) {
    const data = {id: id, status: 1};
    this.subscription.set('updateSub', this.userService
      .updateStatus(data)
      .subscribe(() => {
        this.sharedService.openSnackBar('Status updated', null, { duration: 2000 });
      }))
  }

  deleteUser(id) {
    this.subscription.set('deleteeSub', this.userService
      .deleteUser(id)
      .subscribe(() => {
        this.sharedService.openSnackBar('User deleted', null, { duration: 2000 });
      }))
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
