import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CopywriterService } from '../../copywriter.service';

@Component({
  selector: 'app-copywriterlist',
  templateUrl: './copywriterlist.component.html',
  styleUrls: ['./copywriterlist.component.scss']
})
export class CopywriterlistComponent implements OnInit, OnDestroy {
  private subscription = new Map<String, Subscription>();
  copywriters: any;
  constructor(
    private copywriterService: CopywriterService
  ) { }

  ngOnInit() {
    this.allCopyWriters();
  }

  allCopyWriters() {
    this.subscription.set('copywriterSub', this.copywriterService
      .allCopyWriters()
      .subscribe(res => {
        this.copywriters = res;
      }));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
