import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user.service';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-publisherprofile',
  templateUrl: './publisherprofile.component.html',
  styleUrls: ['./publisherprofile.component.scss']
})
export class PublisherprofileComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  userData: Author;
  updateBtn = false;
  password;
  confirmPassword;
  newPassword;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
      }));
    if (this.id != null) {
      this.userProfile();
    }
  }

  userProfile() {
    this.subscription.set('profileSubscription', this.userService.
      getUser(this.id).subscribe((data => {
        this.userData = data;
      })));
  }

  updateProfile() {
    this.updateBtn = true;
    if (this.newPassword && this.confirmPassword) {
      const data = JSON.parse(sessionStorage.getItem('currentUser'));
      const credentials = {
        password: this.password,
        newPassword: this.newPassword,
        token: data.token
      }
      this.userService.updatePassword(credentials).subscribe();
    }

    this.userService.updateUser(this.userData).subscribe(() => {
      this.sharedService.openSnackBar('Profile Updated', null, {
        duration: 2000
      });
      this.updateBtn = false;
      window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
    }, ((error) => {
      this.sharedService.openSnackBar('Error updating profile', null, {
        duration: 2000
      });
    }));
  }

  get userRole() {
    if (this.userData) {
      return this.userData.roles[0].name;
    }
    return 'None';
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
