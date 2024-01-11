import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';
import { Card } from '@models/cards.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  apiUrl = environment.API_URL;
  bufferSpace = 65535;

  constructor(private http: HttpClient) { }

  getBoards(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, { context: checkToken() });
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length == 1) {
      //is new
      return this.bufferSpace;
    }
    if (cards.length > 1 && currentIndex === 0) {
      //is the top
      const onTopPosition = cards[1].position; //indice 1 es la que estaba mas arriba previamente al movimiento
      return (onTopPosition / 2);
    }
    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      //is the middle
      const prevPosition = cards[currentIndex - 1].position;
      const nexPosition = cards[currentIndex + 1].position;
      return (prevPosition + nexPosition) / 2;
    }
    if(cards.length > 1 && currentIndex === lastIndex) {
      //is the bottom'
      const onBottomPosition = cards[lastIndex - 1].position; //last index -1 es la que estaba mas arriba previamente al movimiento
      return onBottomPosition + this.bufferSpace;
    }
    return 0;
  }
}