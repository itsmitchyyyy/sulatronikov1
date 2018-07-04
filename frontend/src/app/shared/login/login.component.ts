import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  constructor(private activeModal: NgbActiveModal,
  private loginService: LoginService,
private router: Router) { }

  ngOnInit() {
  }

  close(){
    this.activeModal.dismiss('Dismiss');
  }

  login(){
    this.isLoading = true;
    const credentials = {
      username: 'author',
      password: 'author',
    };
    this.loginService.login(credentials).subscribe((res) => {
      this.isLoading = false;
      this.activeModal.dismiss('Logged In');
      this.router.navigate(['listings']);
    });
  }

}
