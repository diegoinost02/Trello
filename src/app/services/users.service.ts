import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, { context: checkToken() });
  }
  // sin interceptor
  // getUsers() {
  //   const token = this.tokenService.getToken();
  //   return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  // }
}