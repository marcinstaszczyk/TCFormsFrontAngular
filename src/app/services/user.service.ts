import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { LoginService } from './login.service';
import { User } from '../model/user';

@Injectable()
export class UserService {

  loggedUser: User;

  private _loginCheckInProgressSubject = new Subject<boolean>();

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.isLogged().subscribe(
      (user: User) => {
        this.loggedUser = user;
      }, 
      () => {},
      () => {
        this._loginCheckInProgressSubject.next(this.loggedUser != null);
        this._loginCheckInProgressSubject.complete();
        this._loginCheckInProgressSubject = null;
      }
    ) 
  }

  login(login: string, password: string) {
    this.loginService.login(login, password).subscribe(
      (user: User) => {
        this.loggedUser = user;
        this.router.navigate(['/list']);
      }
    );
  }

  isAdmin(): boolean | Observable<boolean> {
    if (this._loginCheckInProgressSubject) {
      return this._loginCheckInProgressSubject;
    } else {
      return this.loggedUser != null;
    }
  }
}
