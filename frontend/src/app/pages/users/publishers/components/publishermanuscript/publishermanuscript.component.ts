import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
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
  genre: any;
  searchManuscript$ = new Subject<string>();

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
    this.allGenre();
  }

  sortBy(sort) {
    this.subscription.set('sortSub', this.manuscriptService
      .sortManuscript(sort, this.id)
      .subscribe(res => {
        this.manuscripts = res;
      }))
  }

  manuscriptSearch(text) {
    this.searchManuscript$.next(text)
    this.subscription.set('searchSubscription', this.manuscriptService
      .search(this.searchManuscript$, this.id)
      .subscribe(res => {
        this.manuscripts = res;
      }))
  }

  sortByGenre(sort) {
    this.subscription.set('sortSub', this.manuscriptService
      .sortManuscriptGenre(sort, this.id)
      .subscribe(res => {
        this.manuscripts = res;
      }))
  }

  allGenre() {
    this.subscription.set('genreSub', this.genreService
      .allGenre()
      .subscribe(genres => {
        this.genre = genres;
      }))
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
