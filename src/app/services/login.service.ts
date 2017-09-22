import { User } from './../model/user';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  
  login(login: string, password: string): Observable<User> {
    return this.httpClient.post<{code: number, content: User}>('/api/login', { login: login, password: password }).map(
      (response) => {
        if (response && response.code && response.content) {
          return <User>response.content;
        } else {
          throw new Error('Login failed');
        }
      }
    );
  }

  isLogged(): Observable<User> {
    return this.httpClient.get<{code: number, content: User}>('/api/login').map(
      (response) => {
        if (response && response.code && response.content) {
          return response.content;
        } else {
          return null;
        }
      }
    );
  }

}
