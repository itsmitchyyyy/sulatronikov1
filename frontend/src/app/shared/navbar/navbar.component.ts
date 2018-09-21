import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { LoginService } from '../login/login.service';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any;
  isAuthenticated: boolean;
  isCollapsed = false;
  isSearchClicked = false;
  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private sharedService: SharedService,
    private zone: NgZone,
    private router: Router) { }

  ngOnInit() {
    this.isUserAuthenticated();
  }

  login() {
    this.modalService.open(LoginComponent, { windowClass: 'custom-modal', size: 'lg', centered: true }).result.then(() => {
      if (!this.isAuthenticated) {
        this.isUserAuthenticated();
        this.sharedService.openSnackBar(`Welcome ${this.user.firstName}`, null, {
          duration: 2000
        });
      }
      this.isUserAuthenticated();
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
    });
  }

  get userProfile(){
    if(this.user){
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
