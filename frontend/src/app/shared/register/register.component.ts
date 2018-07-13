import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean;
  accountCredentials: any;

  constructor(private activeModal: NgbActiveModal,
    private registerService: RegisterService) { }

  ngOnInit() {
    this.isLoading = false;
    this.accountCredentials = {};
  }

  register() {
    this.isLoading = true;
    this.registerService.register(this.accountCredentials).subscribe((res) => {
      this.isLoading = false;
    });
  }

}
