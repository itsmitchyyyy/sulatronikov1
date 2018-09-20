import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authornotification',
  templateUrl: './authornotification.component.html',
  styleUrls: ['./authornotification.component.scss']
})
export class AuthornotificationComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
    params.subscribe(params => {
      this.id = +params['id'];
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
