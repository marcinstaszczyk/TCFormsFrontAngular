import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

export abstract class DictionariesService {
  abstract getDictionaries(): Observable<Object>;
}


@Injectable()
export class NodeDictionariesService implements DictionariesService {

  constructor(private httpClient: HttpClient) { }

  getDictionaries() {
    return this.httpClient.get("/api/dictionaries");
  }

}

@Injectable()
export class FirebaseDictionariesService implements DictionariesService {

  constructor(private httpClient: HttpClient) { }

  getDictionaries() {
    //return this.httpClient.get('https://udemy-angular2-course-project.firebaseio.com/tcf/dictionaries.json');
    return Observable.create(function (observer) {
      firebase.database().ref('tcf/dictionaries').once('value', 
        snapshot => observer.next(snapshot.val()),
        error => observer.error(error)
      );
    });
  }

}

