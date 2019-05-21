import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublisherService } from '../../publisher.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { Publisher } from '../../publishers';

@Component({
  selector: 'app-publisher-tlist',
  templateUrl: './publisher-tlist.component.html',
  styleUrls: ['./publisher-tlist.component.scss']
})
export class PublisherTlistComponent implements OnInit, OnDestroy {
  ratingRange = new Array(5);
  displayedColumns: string[] = ['avatar', 'username', 'average'];
  role = 'publisher';
  fakeArray = new Array(12);
  publishers = new MatTableDataSource<Publisher>();
  private subscription = new Map<String, Subscription>();
  constructor(
    private publisherService: PublisherService
  ) { }

  ngOnInit() {
    this.allPublisher();
  }

  allPublisher() {
    this.subscription.set('publisherSubcription', this.publisherService
      .communityList(this.role).subscribe(res => {
        this.publishers.data = res as Publisher[];
      }));
  }

  counter(i: number) {
    return new Array(Math.round(i));
  }

  doFilter(value: string) {
    this.publishers.filter = value.trim().toLocaleLowerCase();
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
