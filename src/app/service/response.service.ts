import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import CardResponse from '../models/card-response';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  BASE_URL = "http://192.168.0.17:8080/api/response";

  constructor(private httpClient:HttpClient) { }

  public post(token, cardResponse:CardResponse):Observable<CardResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.httpClient.post<CardResponse>(this.BASE_URL, cardResponse, httpOptions);
  }
}
