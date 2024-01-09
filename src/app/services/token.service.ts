import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
// npm i typescript-cookie
import { jwtDecode, JwtPayload } from "jwt-decode";
// npm i jwt-decode

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    setCookie('token-trello', token, { expires: 30, path: '/' });
  }

  getToken() {
    const token = getCookie('token-trello');
    return token;
  }

  removeToken() {
    removeCookie('token-trello');
  }
  
  saveRefreshToken(token: string) {
    setCookie('refesh-token-trello', token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    const token = getCookie('refesh-token-trello');
    return token;
  }

  removeRefreshToken() {
    removeCookie('refesh-token-trello');
  }

  isValidToken() {
    const token = this.getToken();
    if(!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);

    if(!decodeToken || !decodeToken?.exp) {
      return false;
    }
    const tokenDate = new Date(0);
    tokenDate.setUTCSeconds(decodeToken.exp);
    const today = new Date();

    return tokenDate.getTime() > today.getTime();
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if(!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);

    if(!decodeToken || !decodeToken?.exp) {
      return false;
    }
    const tokenDate = new Date(0);
    tokenDate.setUTCSeconds(decodeToken.exp);
    const today = new Date();

    return tokenDate.getTime() > today.getTime();
  }

}

  // localstorage

  // saveToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // getToken() {
  //   const token = localStorage.getItem('token');
  //   return token;
  // }

  // removeToken() {
  //   localStorage.removeItem('token');
  // }
