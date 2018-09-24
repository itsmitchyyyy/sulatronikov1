import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../../author.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit, OnDestroy {
  authors: any;

  private subscription = new Map<String, Subscription>();

  constructor(
    private authorService: AuthorService
  ) { }

  ngOnInit() {
    this.allAuthor();
  }

  allAuthor() {
    this.subscription.set('authorSub', this.authorService
      .allAuthor()
      .subscribe(res => {
        this.authors = res;
      }));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
