import { Injectable } from '@angular/core';
import {AppSettings} from "../constant/AppSettings";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {AppCookieService} from "./app-cookie.service";
import {Observable} from "rxjs";
import {RestBody} from "../entity/response";

const LIBRARY_BASE_URL:string = AppSettings.API_BASE_URL + "library/";


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http:HttpClient,
              private cookieService:AppCookieService) { }

  getAllLibrary():Observable<RestBody>{
    return this.http.get<RestBody>(LIBRARY_BASE_URL+"all",this.getTokenHeader());
  }

  createLibrary(libraryName:string):Observable<RestBody>{
    const requestBody:RestBody = {
      code:999,
      message:"create library",
      data:{
        library_name:libraryName,
      }
    };
    return this.http.post<RestBody>(LIBRARY_BASE_URL+"create",requestBody,this.getTokenHeader());
  }

  upload(file:File,library_name:string):Observable<HttpEvent<any>>{
    const formData:FormData = new FormData();

    formData.append("file",file);
    formData.append("library_name",library_name);

    const req = new HttpRequest(
      'POST',LIBRARY_BASE_URL+"upload",formData,{
        reportProgress:true,
        responseType:'json',
        headers:new HttpHeaders(
          {
            'Authorization': this.cookieService.get("token") as string,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          }),
      }
    );

    return this.http.request(req);

  }

  getAllImages(library_name:string):Observable<RestBody>{
    return this.http.get<RestBody>(LIBRARY_BASE_URL+"images",{
      headers:this.getTokenHeader().headers,
      params:{
        library_name:library_name
      }
    })
  };

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
