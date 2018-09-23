import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ManuscriptService } from '../../../manuscript.service';
import { transition, style, trigger, animate } from '@angular/animations';
import { GenreService } from '../../../genre.service';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-publishermanuscript',
  templateUrl: './publishermanuscript.component.html',
  styleUrls: ['./publishermanuscript.component.scss'],
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

export class PublishermanuscriptComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  manuscripts: any;
  hoveredDiv: string;
  manuscriptGenre: any;

  constructor(
    private route: ActivatedRoute,
    private manuscriptService: ManuscriptService,
    private genreService: GenreService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
      }));
    this.getManuscript();
  }

  hideDescription(selectedDiv) {
    this.hoveredDiv = `${selectedDiv}-inactive`;
  }

  showDescription(selectedDiv) {
    this.hoveredDiv = `${selectedDiv}-active`;
  }

  getManuscript() {
    this.subscription.set('manuscriptSubscription', this.manuscriptService
      .getManuscript(this.id)
      .subscribe(res => {
        this.manuscripts = res;
      }));
  }

  manuscript(id) {
    this.subscription.set('genreSubscription', this.genreService
      .findGenre(id).subscribe(res => {
        this.manuscriptGenre = res;
      }));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
