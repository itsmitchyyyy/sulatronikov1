import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hasErrors: string;
  isLoading: boolean;
  accountCredentials: any;
  selectedRole;

  constructor(private activeModal: NgbActiveModal,
    private sharedService: SharedService,
    private registerService: RegisterService) { }

  ngOnInit() {
    this.isLoading = false;
    this.accountCredentials = {};
  }

  close() {
    this.activeModal.dismiss('Dismiss');
  }

  getRole(event) {
    if (event === 'publisher') {
      this.selectedRole = true;
      this.accountCredentials.status = 0;
      return;
    }
    this.accountCredentials.status = 1;
    this.selectedRole = false;
  }

  register() {
    this.isLoading = true;
    this.registerService.register(this.accountCredentials).subscribe((res: any) => {
      if (res && res.token) {
        sessionStorage.setItem('currentUser', JSON.stringify({ token: res.token }));
        sessionStorage.setItem('authenticated', JSON.stringify({ isAuthenticated: true }));
      } else if (res && (res.email || res.username)) {
        this.hasErrors = res;
      } else {
        this.sharedService.openSnackBar('Registered Succesfully, Please wait for the admin to approve', null, { duration: 2000 })
      }
      this.activeModal.close(true);
      this.isLoading = false;
    });
  }

}
