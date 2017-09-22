import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Form } from './../model/form';
import { dateToDateString } from '../util/js-util';

@Injectable()
export class FormsService {

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
