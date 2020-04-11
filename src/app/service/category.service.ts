import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import Category from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  BASE_URL = "http://192.168.0.17:8080/api/category";
  constructor(private httpClient:HttpClient) {
  }

  public get(token):Observable<Category[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.httpClient.get<Category[]>(this.BASE_URL, httpOptions);
  }

  public post(token, category:Category):Observable<Category> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.httpClient.post<Category>(this.BASE_URL,category, httpOptions);
  }

  public delete(token, id):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.httpClient.delete<any>(this.BASE_URL + "/" + id,httpOptions);
  }
}
