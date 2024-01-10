import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  apiUrl = environment.API_URL

  constructor(private http: HttpClient) { }

  getBoards(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, { context: checkToken() });
  }
}