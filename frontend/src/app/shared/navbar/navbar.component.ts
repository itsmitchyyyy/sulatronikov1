import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userRole: string;
  isAuthenticated: boolean;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.isAuthenticated = false;
  }

  login(){
    this.modalService.open(LoginComponent, { windowClass: 'custom-modal', size: 'lg', centered: true }).result.then((res) => {
      this.isAuthenticated = res;
    });
  }

  register(){
    this.modalService.open(RegisterComponent, { size: 'lg', centered: true });
  }

}
