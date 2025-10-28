import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IToken } from '../interfaces/IToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private route: Router) { }

  getToken(): IToken | null {
    let token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return JSON.parse(token);
  }
}
