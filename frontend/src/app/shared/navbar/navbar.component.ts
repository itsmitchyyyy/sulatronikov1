import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { LoginService } from '../login/login.service';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../../pages/users/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any;
  searchUser$ = new Subject<string>();
  isAuthenticated: boolean;
  isCollapsed = false;
  isSearchClicked = false;
  isSearched;
  searchData: any;
  isSearching;
  private subscription = new Map<String, Subscription>();

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private sharedService: SharedService,
    private zone: NgZone,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.isUserAuthenticated();
  }

  login() {
    this.modalService.open(LoginComponent, { windowClass: 'custom-modal', size: 'lg', centered: true }).result.then(() => {
      this.isUserAuthenticated();
      this.loginService.isAuthenticated(true);
    });
  }

  register() {
    this.modalService.open(RegisterComponent, { size: 'lg', centered: true }).result.then(() => {
      this.isUserAuthenticated();
    });
  }

  logout() {
    this.loginService.logout().subscribe(() => {
      sessionStorage.clear();
      this.isAuthenticated = false;
      this.loginService.isAuthenticated(false);
      localStorage.clear();
      this.router.navigate(['home']);
    });
  }

  isUserAuthenticated() {
    const checkAuthenticated = JSON.parse(sessionStorage.getItem('authenticated'));
    if (checkAuthenticated) {
      this.isAuthenticated = checkAuthenticated.isAuthenticated;
      this.getUser();
    } else {
      this.isAuthenticated = false;
    }
  }

  userSearch(text) {
    this.isSearching = true;
    this.isSearched = true;
    this.searchUser$.next(text);
    this.subscription.set('searchSub', this.userService
      .search(this.searchUser$)
      .subscribe(res => {
        if (res.length < 0) {
          this.searchData = [];
          this.isSearching = false;
          return;
        }
        if (res === 'E') {
          this.isSearched = false;
          return;
        }
        this.isSearching = false;
        this.searchData = res;
      }))
  }

  getUser() {
    this.loginService.getLoggedIn().subscribe((res) => {
      this.zone.run(() => {
        this.user = res;
      });
    }, (error) => {
      sessionStorage.clear();
      this.isAuthenticated = false;
      this.sharedService.openSnackBar('Session Expired', null, {
        duration: 2000
      });
      localStorage.clear();
      this.router.navigate(['home']);
    });
  }

  navigateProfile(item) {
    this.isSearched = false;
    this.isSearchClicked = false;
    this.router.navigate([`${item.roles[0].name}s/profile`, item.id]);
  }

  get userRole() {
    if (this.user) {
      return this.user.roles[0].name;
    }
    return;
  }

  get userProfile() {
    if (this.user) {
      return this.user.roles[0].name + `s/profile/${this.user.id}/edit`;
    }
    return 'Unknown';
  }

  get userName() {
    if (this.user) {
      return this.user.firstName;
    }
    return 'Unknown';
  }

}
