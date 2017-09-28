import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { ReplayLastSubject } from './../util/js-util';

import * as firebase from 'firebase';

import { User } from './../model/user';

export abstract class LoginService {
  abstract login(login: string, password: string): Observable<User>;
  abstract getUser(): Observable<User>;
}

@Injectable()
export class NodeLoginService implements LoginService {

  userStateChange: ReplayLastSubject<User>;

  constructor(private httpClient: HttpClient) {}
  
  login(login: string, password: string): Observable<User> {
    return this.httpClient.post<{code: number, content: User}>('/api/login', { login: login, password: password }).map(
      response => {
        if (response && response.code && response.content) {
          const user = <User>response.content;
          this.userStateChange.next(user);
          return user;
        } else {
          throw new Error('Login failed');
        }
      }
    );
  }
  
  getUser(): Observable<User> {
    if (!this.userStateChange) {
      this.userStateChange = new ReplayLastSubject<User>();

      this.httpClient.get<{code: number, content: User}>('/api/login').subscribe(
        response => this.userStateChange.next(response && response.code && response.content ? response.content : null),
        error => this.userStateChange.next(null)
      );
    }

    return this.userStateChange;
  }
}

@Injectable()
export class FirebaseLoginService implements LoginService {

  userStateChange: ReplayLastSubject<User>;

  constructor() { }
  
  login(login: string, password: string): Observable<User> {
    return fromPromise(firebase.auth().signInWithEmailAndPassword(login, password));
  }

  getUser(): Observable<User> {
    if (!this.userStateChange) {
      this.userStateChange = new ReplayLastSubject<User>();
      firebase.auth().onAuthStateChanged(
        user => {
          console.log('User status change: ', user);
          if (user && !user.isAnonymous) {
            const appUser = new User();
            appUser.login = user.email;
      
            this.userStateChange.next(appUser);
          } else {
            this.userStateChange.next(null);
            /*if (!user) {
              console.log('SignIn Anonymously - start');
              firebase.auth().signInAnonymously()
                .then(user => console.log('SignIn Anonymously - end', user))
                .catch(error => console.error("Startup anonymous signin failed", (<any>error).code, error.message)
              );
            }*/
          }
        }
      );
    }

    return this.userStateChange;
  }
}
