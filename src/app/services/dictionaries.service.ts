import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DictionariesService {

  constructor(private httpClient: HttpClient) { }

  getDictionaries() {
    return this.httpClient.get("/api/dictionaries");
  }

}
