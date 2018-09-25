import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

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
export class PublishedbooksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
