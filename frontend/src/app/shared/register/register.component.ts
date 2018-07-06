import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  accountCredentials: any;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.accountCredentials = {};
  }

}
