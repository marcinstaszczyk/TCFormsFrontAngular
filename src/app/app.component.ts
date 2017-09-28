import { Component, AfterViewChecked, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { environment } from './../environments/environment';

import { UserService } from './services/user.service';
import { MessagesService } from './services/messages.service';

@Component({
  selector: 'tcf-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit, AfterViewChecked {
  constructor(public userService: UserService, public messagesService: MessagesService) {
    if (environment.firebaseConfig) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    console.log('Change detection trigerred');
  }

  onLogout() {
    firebase.auth().signOut();
  }
}
