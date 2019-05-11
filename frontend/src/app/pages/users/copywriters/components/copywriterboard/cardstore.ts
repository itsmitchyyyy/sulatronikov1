import { Cardschema } from "./cardschema";


export class CardStore {
    cards: Object  = {};
    lastid = -1;

    _addCard(card: Cardschema) {
        card.id = String(++this.lastid);
        this.cards[card.id] = card;
        return (card.id);
    }

    getCard(cardId: string) {
        return this.cards[cardId];
    }

    _updateCard(cardId: string, description: string) {
        const card = new Cardschema();
        card.description = description;
        this.cards[cardId] = card;
        return (card.id);
    }

    newCard(description: string) {
        const card = new Cardschema();
        card.description = description;
        return (this._addCard(card));
    }
}