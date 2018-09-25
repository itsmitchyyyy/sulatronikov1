import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/login/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  fakeArray = new Array(4);
  headers = [
    {
      title: 'Latest Publish'
    }
  ];

  currentUser;
  private subscription = new Map<String, Subscription>();
  constructor(
    private logginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {

    this.logginService.authenticated.subscribe(res => {
      const isValid = JSON.parse(localStorage.getItem('storedPop'));
      if (isValid) {
        this.currentLoggedIn();
        return;
      }
      this.currentUser = null;
    })
  }

  currentLoggedIn() {
    this.subscription.set('logSub', this.logginService
      .getLoggedIn()
      .subscribe(res => {
        if(res.roles[0].name === 'admin'){
          this.router.navigate(['/admin/accounts']);
        }
      }))
  }

  get userRole() {
    if (this.currentUser) {
      return this.currentUser.roles[0].name;
    }
    return;
  }
}
