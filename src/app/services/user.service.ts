import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { LoginService } from './login.service';
import { User } from '../model/user';

@Injectable()
export class UserService {

  private _loggedUser: User;

  private _isAdminObservable: Observable<boolean>;

  constructor(private loginService: LoginService, private router: Router) {}

  login(login: string, password: string) {
    this.loginService.login(login, password).subscribe(
      (user: User) => {
        this.router.navigate(['/list']);
      },
      (error) => {/*TODO*/}
    );
  }

  isAdmin(): Observable<boolean> {
    if (!this._isAdminObservable) {
      this._isAdminObservable = this.loginService.getUser().do(user => this._loggedUser = user).map(user => user != null);
    }

    return this._isAdminObservable;
  }
}
