import { Card } from "./cards.model";

export interface List {
    id: string;
    title: string;
    position: number;
    cards: Card[];
    showCardForm?: boolean;
}

export interface CreateListDto extends Omit<List, 'id' | 'cards'> {
    boardId: string;
}