import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../../author.service';
import { Subscription } from 'rxjs';
import { PublisherService } from '../../../publishers/publisher.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit, OnDestroy {
  ratingRange = new Array(5);
  displayedColumns: string[] = ['avatar', 'username', 'average'];
  role = 'author';
  fakeArray = new Array(12);
  authors = new MatTableDataSource<Author>();
  private subscription = new Map<String, Subscription>();
  constructor(
    private publisherService: PublisherService
  ) { }

  ngOnInit() {
    this.allAuthor();
  }

  allAuthor() {
    this.subscription.set('authorSubcription', this.publisherService
      .communityList(this.role).subscribe(res => {
        this.authors.data = res as Author[];
      }));
  }

  counter(i: number) {
    return new Array(Math.round(i));
  }

  doFilter(value: string) {
    this.authors.filter = value.trim().toLocaleLowerCase();
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
