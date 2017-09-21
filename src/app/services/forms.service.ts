import { Form } from './../model/form';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class FormsService {

  constructor(private httpClient: HttpClient) { }
  
    getForm(uuid: string) {
      let params = new HttpParams();
      params = params.set('uuid', uuid);
      
      return this.httpClient.get<{content: Form}>("/api/forms/0", { params: params,  }).map(result => result.content);
    }

    saveForm(form: Form) {
      return this.httpClient.post("/api/forms" + (form.id ? ('/' + form.id) : ''), form)
    }
}
