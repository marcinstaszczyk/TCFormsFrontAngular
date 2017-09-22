import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tcf-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  login: string;
  password: string

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onLogin() {
    this.userService.login(this.login, this.password);
  }

}
