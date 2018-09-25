import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ManuscriptService } from '../../../manuscript.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-publishedbooks',
  templateUrl: './publishedbooks.component.html',
  styleUrls: ['./publishedbooks.component.scss'],
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
export class PublishedbooksComponent implements OnInit, OnDestroy {
  pendingManuscripts: any;
  private subscription = new Map<String, Subscription>();
  constructor(
    private manuscriptService: ManuscriptService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.pendManuscript();
  }

  pendManuscript() {
    this.subscription.set('manuSub', this.manuscriptService
      .pendingManuscript()
      .subscribe(res => {
        this.pendingManuscripts = res;
      }))
  }

  publishBook(id) {
    this.subscription.set('publishBookSub', this.manuscriptService
      .publishBook(id)
      .subscribe(() => {
        this.sharedService.openSnackBar('Published Book', null, { duration: 2000 });
        this.pendManuscript();
      }))
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
