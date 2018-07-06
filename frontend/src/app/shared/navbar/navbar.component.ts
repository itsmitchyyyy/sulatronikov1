import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userRole: string;
  isAuthenticated: boolean;
  constructor(private modalService: NgbModal,
  private loginService: LoginService) { }

  ngOnInit() {
    this.isUserAuthenticated();
  }

  login(){
    this.modalService.open(LoginComponent, { windowClass: 'custom-modal', size: 'lg', centered: true }).result.then(() => {
      const checkAuthenticated = JSON.parse(sessionStorage.getItem('authenticated'));      
      this.isAuthenticated = checkAuthenticated.isAuthenticated;
    });
  }

  register(){
    this.modalService.open(RegisterComponent, { size: 'lg', centered: true });
  }

  logout(){
    this.loginService.logout().subscribe(() => {
      sessionStorage.clear();
      this.isAuthenticated = false;
    });
  }

  isUserAuthenticated(){
    const checkAuthenticated = JSON.parse(sessionStorage.getItem('authenticated'));
    if(checkAuthenticated){
      this.isAuthenticated = checkAuthenticated.isAuthenticated
    }else{
      this.isAuthenticated = false;
    }
  }

  get userName(){
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    return currentUser.username;
  }

}
