import { Component, AfterViewChecked, OnInit, NgZone } from '@angular/core';
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
  constructor(public userService: UserService, public messagesService: MessagesService, private zone: NgZone) {
    if (environment.firebaseConfig) {
      this.zone.runOutsideAngular(() => {
        firebase.initializeApp(environment.firebaseConfig);
      });
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
