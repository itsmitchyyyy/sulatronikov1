import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authorviewmanuscript',
  templateUrl: './authorviewmanuscript.component.html',
  styleUrls: ['./authorviewmanuscript.component.scss']
})
export class AuthorviewmanuscriptComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription.set('routerSubscription', this.router.params.subscribe(params => {
      this.id = +params['id'];
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
