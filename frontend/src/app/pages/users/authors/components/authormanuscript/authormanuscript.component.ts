import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ManuscriptService } from '../../../manuscript.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { GenreService } from '../../../genre.service';

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
  id: number;
  manuscripts: any;
  hoveredDiv: string;
  genre: any;
  publishedManuscripts: any;
  private subscription = new Map<String, Subscription>();
  searchManuscript$ = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private manuscriptService: ManuscriptService,
    private genreService: GenreService
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
      }));
    this.authorManuscript();
    this.getPublishedManuscript();
    this.allGenre();
  }

  sortBy(sort) {
    this.subscription.set('sortSub', this.manuscriptService
      .sortAuthManuscript(sort, this.id)
      .subscribe(res => {
        // this.manuscripts = res;
        let published = [];
        let unpublished = [];
        res.map((data) => {
          if (data.manuscriptStatus == 1) {
            published.push(data);
          } else {
            unpublished.push(data);
          }
        });
        this.manuscripts = unpublished;
        this.publishedManuscripts = published;
      }))
  }

  manuscriptSearch(text) {
    this.searchManuscript$.next(text)
    this.subscription.set('searchSubscription', this.manuscriptService
      .searchAuth(this.searchManuscript$, this.id)
      .subscribe(res => {
        // this.manuscripts = res;
        let published = [];
        let unpublished = [];
        res.map((data) => {
          if (data.manuscriptStatus == 1) {
            published.push(data);
          } else {
            unpublished.push(data);
          }
        });
        this.manuscripts = unpublished;
        this.publishedManuscripts = published;
      }))
  }

  sortByGenre(sort) {
    this.subscription.set('sortSub', this.manuscriptService
      .sorAuthManuscriptGenre(sort, this.id)
      .subscribe(res => {
        let published = [];
        let unpublished = [];
        res.map((data) => {
          if (data.manuscriptStatus == 1) {
            published.push(data);
          } else {
            unpublished.push(data);
          }
        });
        this.manuscripts = unpublished;
        this.publishedManuscripts = published;
      }));
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

  getPublishedManuscript() {
    this.subscription.set('manuscriptSubscription', this.manuscriptService
      .authorPublishedManuscript(this.id)
      .subscribe(res => {
        this.publishedManuscripts = res;
      }));
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
