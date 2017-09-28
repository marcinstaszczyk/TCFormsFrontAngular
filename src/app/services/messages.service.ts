import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {

  private _counter = 0;
  messages = new Array<{no: number, message: string, status: string}>();

  private _FADEOUT_ANIMATION_TIME = 1000;

  constructor() { }

  showError(message: string, visibleMiliseconds = 5000): void {
    const no = ++this._counter;
    
    this.messages.push({no: no, message: message, status: 'show'});

    setTimeout(() => 
      this.messages = this.messages.map(
        (item) => { return item.no !== no ? item : {no: item.no, message: item.message, status: 'fadeout'} }
      )
    , visibleMiliseconds);
    
    setTimeout(() => 
      this.messages = this.messages.filter(item => item.no !== no)
    , visibleMiliseconds + this._FADEOUT_ANIMATION_TIME);
  }
}
