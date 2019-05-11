import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ListSchema } from '../listschema';
import { CardStore } from '../cardstore';
import { Cardschema } from '../cardschema';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private editCardInput: ElementRef;
  @Input() list: ListSchema;
  @Input() cardStore: CardStore;
  @ViewChild('editCardInput') set content(content: ElementRef) {
    this.editCardInput = content;
  };
  displayAddCard = false;
  displayEditCard = false;
  editId: string;
  selectedIndex: string;

  constructor() { }

  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }

  onEditDisplayAddCard(cardId: string, event: any) {
    this.selectedIndex = cardId;
    this.displayEditCard = true;
    setTimeout(() => {
      this.editCardInput.nativeElement.value = event.target.innerHTML;
    });
    this.editId = cardId;
  }

  ngOnInit() {
  }

  allowDrop($event) {
    $event.preventDefault();
  }

  drop($event) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData('text');

    let target = $event.target;
    const targetClassName = target.className;

    while (target.className !== 'list') {
      target = target.parentNode;
    }
    target = target.querySelector('.cards');

    if (targetClassName === 'card') {
      $event.target.parentNode.insertBefore(document.getElementById(data), $event.target);
    } else if (targetClassName === 'list--title') {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
  }

  onEnter(value: string) {
    const cardId = this.cardStore.newCard(value);
    this.list.cards.push(cardId);
  }

  onEditEnter(value: string) {
    const cardId = this.cardStore._updateCard(this.editId, value);
    this.list.cards[cardId] = cardId;
    this.selectedIndex = null;
  } 

}
