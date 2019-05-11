import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardStore } from './cardstore';
import { ListSchema } from './listschema';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-copywriterboard',
  templateUrl: './copywriterboard.component.html',
  styleUrls: ['./copywriterboard.component.scss']
})
export class CopywriterboardComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  cardStore: CardStore;
  lists: ListSchema[];

  constructor(
    private route: ActivatedRoute
    ) { }

  setMockData(): void {
    this.cardStore = new CardStore();
    const lists: ListSchema[] = [
      {
        name: 'To Do',
        cards: []
      },
      {
        name: 'Doing',
        cards: []
      },
      {
        name: 'Done',
        cards: []
      }
    ]
    this.lists = lists;
  }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
      }));
    this.setMockData();
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
