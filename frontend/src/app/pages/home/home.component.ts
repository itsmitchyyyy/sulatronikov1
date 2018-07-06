import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: LoginService) { }

  ngOnInit() {
    this.getLoggedIn();
  }

  getLoggedIn(){
    this.userService.getLoggedIn().subscribe((res) => {
    });
  }
}
