import { Injectable } from '@angular/core';


type Cookie = {
  [key:string]:string;
}

@Injectable({
  providedIn: 'root'
})
export class AppCookieService {
  private cookies:Cookie = {};

  constructor() {

  }

  public readCookies(cookiesRead = document.cookie){
    this.cookies = {};

    if (!cookiesRead) { return; }

    const cookiesReadArr = cookiesRead.split(";");

    for (const cookie of cookiesReadArr)
    {
      const cookieReadArr = cookie.split("=");
      this.cookies[cookieReadArr[0].trim()] = cookieReadArr[1];
    }
  }

  get(key: string) {
    this.readCookies();
    return !!this.cookies[key] ? this.cookies[key] : null;
  }

  remove(key: string) {
    document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }

  set(key: string, value: string) {
    document.cookie = key + '=' + (value || '');
  }

  clear(){
    this.remove("username");
    this.remove("token");
    this.remove('isLogin');
  }


}
