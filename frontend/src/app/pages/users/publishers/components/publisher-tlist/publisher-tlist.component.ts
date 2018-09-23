import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublisherService } from '../../publisher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publisher-tlist',
  templateUrl: './publisher-tlist.component.html',
  styleUrls: ['./publisher-tlist.component.scss']
})
export class PublisherTlistComponent implements OnInit, OnDestroy {
  fakeArray = new Array(12);
  publishers: any;
  private subscription = new Map<String, Subscription>();
  constructor(
    private publisherService: PublisherService
  ) { }

  ngOnInit() {
    this.allPublisher();
  }

  allPublisher() {
    this.subscription.set('publisherSubcription', this.publisherService
      .allPublishers().subscribe(res => {
        this.publishers = res;
      }));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
