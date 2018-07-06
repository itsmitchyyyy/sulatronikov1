import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  isError: boolean;
  username: string;
  password: string;

  constructor(private activeModal: NgbActiveModal,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.dismiss('Dismiss');
  }

  login() {
    this.isLoading = true;
    const credentials = {
      username: this.username,
      password: this.password,
    };
    this.loginService.login(credentials).subscribe((res) => {
      sessionStorage.setItem('authenticated', JSON.stringify({ isAuthenticated: true }));
      this.isLoading = false;
      this.activeModal.close(true);
    }, (error) => {
        this.isError = true;
        this.isLoading = false;
    });
  }

}
