import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import Card from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  BASE_URL = "http://192.168.0.17:8080/api/card";
  
  constructor(private httpClient:HttpClient) {
  }

  public post(token, card:Card):Observable<Card> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.httpClient.post<Card>(this.BASE_URL,card, httpOptions);
  }

}
