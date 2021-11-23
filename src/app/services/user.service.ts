import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AppSettings} from "../constant/AppSettings";
import {Observable} from "rxjs";
import {RestBody} from "../entity/response";

const USER_BASE_URL:string = AppSettings.API_BASE_URL + "user/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(username:string,password:string):Observable<RestBody>{
      const requestBody:RestBody = {
        code:201,
        message:"login",
        data:{
          username:username,
          password:password
        }
      };

      return this.http.post<RestBody>(USER_BASE_URL+"login",requestBody);
  }
}
