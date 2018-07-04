import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,
  private loginService: LoginService) { }

  ngOnInit() {
  }

  close(){
    this.activeModal.dismiss('Dismiss');
  }

  login(){
    const credentials = {
      username: 'author',
      password: 'author',
    };
    this.loginService.login(credentials).subscribe((res) => {
      console.log(res);
    });
  }

}
