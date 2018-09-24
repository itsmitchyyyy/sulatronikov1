import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ManuscriptService } from '../../../manuscript.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-authormanuscript',
  templateUrl: './authormanuscript.component.html',
  styleUrls: ['./authormanuscript.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-50%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-50%)' }))
      ])
    ])
  ]
})
export class AuthormanuscriptComponent implements OnInit, OnDestroy {
  fakeArray = new Array(10);
  id: number;
  manuscripts: any;
  hoveredDiv: string;
  private subscription = new Map<String, Subscription>();

  constructor(
    private route: ActivatedRoute,
    private manuscriptService: ManuscriptService
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
      }));
      this.authorManuscript();
  }

  hideDescription(selectedDiv) {
    this.hoveredDiv = `${selectedDiv}-inactive`;
  }

  showDescription(selectedDiv) {
    this.hoveredDiv = `${selectedDiv}-active`;
  }


  authorManuscript() {
    this.subscription.set('manuscriptSub', this.manuscriptService
      .authorManuscript(this.id)
      .subscribe(res => {
        this.manuscripts = res;
      }));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
