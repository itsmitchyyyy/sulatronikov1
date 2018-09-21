import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-publisherprofile',
  templateUrl: './publisherprofile.component.html',
  styleUrls: ['./publisherprofile.component.scss']
})
export class PublisherprofileComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
      }));
      if(this.id != null){
      this.getUserProfile();
      }
  }

  getUserProfile() {
    this.subscription.set('profileSubscription', this.userService.
      getUser(this.id).subscribe((data => {
        this.userData = data;
        console.log(this.userData);
      })));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
