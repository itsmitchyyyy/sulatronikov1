import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManuscriptService } from '../users/manuscript.service';
import { transition, trigger, style, animate } from '@angular/animations';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
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

export class BooksComponent implements OnInit, OnDestroy {
  books: any;
  hoveredDiv: string;
  private subscription = new Map<String, Subscription>();
  constructor(
    private manuscriptService: ManuscriptService
  ) { }

  ngOnInit() {
    this.allBooks();
  }

  allBooks() {
    this.subscription.set('allBooksSub', this.manuscriptService
      .allBooks()
      .subscribe(res => {
        this.books = res;
      }))
  }

  hideDescription(selectedDiv) {
    this.hoveredDiv = `${selectedDiv}-inactive`;
  }

  showDescription(selectedDiv) {
    this.hoveredDiv = `${selectedDiv}-active`;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
