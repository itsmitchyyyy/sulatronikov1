import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user.service';
import { SharedService } from '../../../../../shared/shared.service';
import { LoginService } from '../../../../../shared/login/login.service';
import { NavbarComponent } from '../../../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-authorprofile',
  templateUrl: './authorprofile.component.html',
  styleUrls: ['./authorprofile.component.scss'],
  providers: [NavbarComponent]
})
export class AuthorprofileComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  userData: Author;
  updatePassword: any;
  updateBtn = false;
  password;
  confirmPassword;
  newPassword;
  imgSrc: any;
  profilePicture;;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router,
    private loginService: LoginService,
    private navbarComponent: NavbarComponent
  ) { }

  ngOnInit() {
    this.updatePassword = {};
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
      }));
    if (this.id != null) {
      this.userProfile();
    }
  }

  deactivate() {
    const data = { id: this.id, status: 0 };
    this.subscription.set('updateSub', this.userService
      .updateStatus(data)
      .subscribe(() => {
        this.navbarComponent.logout();
      }))
  }

  addProfilePicture(event) {
    if (event.target.files && event.target.files[0]) {
      this.profilePicture = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(this.profilePicture);
    }
  }

  userProfile() {
    this.subscription.set('profileSubscription', this.userService.
      getUser(this.id).subscribe((data => {
        this.userData = data;
        if (data.avatar) {
          this.imgSrc = data.avatar;
        }
      })));
  }

  updateProfile() {
    this.updateBtn = true;
    const data = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.newPassword && this.confirmPassword) {
      const credentials = {
        password: this.password,
        newPassword: this.newPassword,
        token: data.token
      }
      this.subscription.set('passwordSubcription', this.userService
        .updatePassword(credentials)
        .subscribe())
    }

    if (this.profilePicture) {
      let profileData = new FormData();
      profileData.append('avatar', this.profilePicture, this.profilePicture.name);
      profileData.append('token', data.token);

      this.subscription.set('profilePicSubscription', this.userService
        .updateProfilePic(profileData)
        .subscribe())
    }

    this.subscription.set('profileDataSubscription', this.userService
      .updateUser(this.userData).subscribe(() => {
        this.sharedService.openSnackBar('Profile Updated', null, {
          duration: 2000
        });
        this.updateBtn = false;
        window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
      }, ((error) => {
        this.sharedService.openSnackBar('Error updating profile', null, {
          duration: 2000
        });
      })))
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
