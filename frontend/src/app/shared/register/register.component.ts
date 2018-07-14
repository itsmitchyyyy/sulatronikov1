import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hasErrors: string;
  isLoading: boolean;
  accountCredentials: any;

  constructor(private activeModal: NgbActiveModal,
    private registerService: RegisterService) { }

  ngOnInit() {
    this.isLoading = false;
    this.accountCredentials = {};
  }

  close() {
    this.activeModal.dismiss('Dismiss');
  }

  register() {
    this.isLoading = true;
    this.registerService.register(this.accountCredentials).subscribe((res: any) => {
      if (res && res.token) {
        sessionStorage.setItem('currentUser', JSON.stringify({ token: res.token }));
        sessionStorage.setItem('authenticated', JSON.stringify({ isAuthenticated: true }));
        this.activeModal.close(true);
      } else if (res && (res.email || res.username)) {
        this.hasErrors = res;
      }
      this.isLoading = false;
    });
  }

}
