import { Component, OnInit, Input } from '@angular/core';
import { Cardschema } from '../cardschema';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Cardschema;

  constructor() { }

  ngOnInit() {
  }

  dragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

}
