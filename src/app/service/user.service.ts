import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import User from '../models/user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //BASE_URL = "http://localhost:8080/";
  BASE_URL = "http://192.168.0.17:8080/";

  constructor(private httpClient:HttpClient) { }

  public login(data:User):Observable<HttpResponse<User>>{
    return this.httpClient.post<User>(this.BASE_URL+"login",data,{observe: 'response'});
  }
}
