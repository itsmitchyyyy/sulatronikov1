import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManuscriptService } from '../users/manuscript.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  books: any;
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

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
