import { UserService } from './services/user.service';
import { Component, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'tcf-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements AfterViewChecked {
  constructor(public userService: UserService) {}

  ngAfterViewChecked() {
    //console.log('Change detection trigerred');
  }
}
