import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

import { Form } from './../model/form';
import { dateToDateString } from '../util/js-util';

export abstract class FormsService {
  abstract getFormsList(): Observable<Array<Form>>;
  abstract getFormByUUID(uuid: string): Observable<Form>;
  abstract getForm(id: string): Observable<Form>;
  abstract saveForm(form: Form): Observable<Form>;
  abstract deleteForm(form: Form): Observable<any>;
}

@Injectable()
export class NodeFormsService implements FormsService {

  constructor(private httpClient: HttpClient) { }

  getFormsList(): Observable<Array<Form>> {
    return this.httpClient.get<Array<Form>>("/api/forms").map(array => array.map(this._prepareForm));
  }

  getFormByUUID(uuid: string) {
    let params = new HttpParams();
    params = params.set('uuid', uuid);
    
    return this.httpClient.get<{code: number, content: Form}>("/api/forms/0", { params: params }).map(
      (response) => {
        if (response && response.code && response.content) {
          return this._prepareForm(<Form>response.content);
        } else {
          throw new Error('getFormByUUID failed');
        }
      }
    );
  }

  getForm(id: string) {
      return this.httpClient.get<{code: number, content: Form}>("/api/forms/" + id).map(
      (response) => {
        if (response && response.code && response.content) {
          return this._prepareForm(<Form>response.content);
        } else {
          throw new Error('getForm failed');
        }
      }
    );
  }

  saveForm(form: Form) {
    return this.httpClient.post<{code: number, content: Form}>("/api/forms" + (form.id ? ('/' + form.id) : ''), form).map(
      (response) => {
        if (response && response.code && response.content) {
          return this._prepareForm(<Form>response.content);
        } else {
          throw new Error('saveForm failed');
        }
      }
    )
  }

  deleteForm(form: Form) {
    return this.httpClient.delete("/api/forms/" + form.id);
  }

  private _prepareForm(form: Form): Form {
    if (form.startDate && form.startDate.indexOf('Z') >= 0 ) {
      form.startDate = dateToDateString(new Date(form.startDate));
    }

    return form;
  }
    
}

@Injectable()
export class FirebaseFormsService implements FormsService {

  private firebaseFormsRef = firebase.database().ref('tcf/forms');
  private firebaseFormsCounterRef = firebase.database().ref('tcf/formsCounter');

  constructor() { }

  getFormsList(): Observable<Array<Form>> {
    return Observable.create(observer => {
      this.firebaseFormsRef.once('value', 
        snapshot => observer.next(snapshot.val()),
        error => observer.error(error)
      );
    }).map(data => Object.keys(data).map(key => data[key]))
      .do(value => console.log('data', value));
  }

  getFormByUUID(uuid: string) {
    return Observable.create(observer => {
      this.firebaseFormsRef.child(uuid).once('value', 
        snapshot => observer.next(snapshot.val()),
        error => observer.error(error)
      );
    });
  }

  getForm(id: string) {
    return Observable.create(observer => {
      this.firebaseFormsRef.orderByChild('id').equalTo(id).once('value', 
        snapshot => observer.next(this._extractOneFromQuery(snapshot.val())),
        error => observer.error(error)
      );
    });
  }
  private _extractOneFromQuery(data: any) {
    if (!data) {
      return null;
    }
    for (var key in data) {
      return data[key];
    }
    return null;
  }

  saveForm(form: Form): Observable<Form> {
    if (!form.uuid) {
      // Get a key/uuid for a new Item.
      const postKey = this.firebaseFormsRef.push().key;
      
      const copy = {...form};
      copy.uuid = postKey; 
      //copy.id = postKey;

      const subject = new Subject();

      return Observable.create(observer => {
        this.firebaseFormsCounterRef.transaction(
          currentValue => (currentValue||0) + 1,
          (err, commited, ss) => {
            if (err) {
              console.log(err); //TODO
            } else if (commited) {
              copy.id = ss.val().toString();
              this._saveFormWithId(copy).subscribe(observer);//error TODO
            }
          }
        );
      })
    } else {
      return this._saveFormWithId(form);
    }
  }
  private _saveFormWithId(form: Form): Observable<Form> {
    return fromPromise(this.firebaseFormsRef.child(form.uuid).set(form)).map(() => form );
  }

  deleteForm(form: Form) {
    return fromPromise(this.firebaseFormsRef.child(form.uuid).set(null))
  } 
}
