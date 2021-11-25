import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AppSettings} from "../constant/AppSettings";
import {asyncScheduler, catchError, from, map, Observable, of, scheduled, switchMap} from "rxjs";
import {RestBody} from "../entity/response";
import {AppCookieService} from "./app-cookie.service";

const USER_BASE_URL:string = AppSettings.API_BASE_URL + "user/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private cookieService:AppCookieService) { }

  login(username:string,password:string):Observable<RestBody>{
      const requestBody:RestBody = {
        code:999,
        message:"login",
        data:{
          username:username,
          password:password
        }
      };
      return this.http.post<RestBody>(USER_BASE_URL+"login",requestBody);
  }

  logout():Observable<RestBody>{

    if (this.cookieService.get('token') == null){
      const result:RestBody = {
        code:400,
        message:"unauthenticated",
        data:{}
      };
      return new Observable<RestBody>(subscriber => {
        subscriber.next(result);
      })
    }

    else {
      const requestBody:RestBody = {
        code:999,
        message:"log out",
        data:{
          token: this.cookieService.get('token'),
          username:this.cookieService.get('username')
        }
      };
      return this.http.post<RestBody>(USER_BASE_URL+"logout",requestBody,this.getTokenHeader());
    }
  }

  signup(username:string,password:string,email:string):Observable<RestBody | any>{
    const usernameCheckRequestBody:RestBody = {
      code:999,
      message:"check username",
      data:{
        username:username
      }
    };

    const signUpRequestBody:RestBody = {
      code:999,
      message:"check username",
      data:{
        username:username,
        password:password,
        email:email
      }
    };

    const existResponseMock:RestBody = {
      code:900,
      message:"user has been exist",
      data:{
        username:username,
      }
    };


    return this.http.post<RestBody>(USER_BASE_URL+"find_by_username",usernameCheckRequestBody).pipe(
      switchMap(
        (res:RestBody) => {
            if (res.code == 200){
              throw new Error("user has been exist");
            }
            else {
              return this.http.post(USER_BASE_URL+"signup",signUpRequestBody);
            }
        }
      ),
      catchError(err => of(existResponseMock))
    );

  }

  checkLogin():Observable<RestBody>{
    return this.http.get<RestBody>(USER_BASE_URL+"check",this.getTokenHeader());
  }


  getTokenHeader(){
    return  {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.cookieService.get("token") as string,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        })
    };
  }

}
