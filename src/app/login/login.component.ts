import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validator, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {RestBody} from "../entity/response";
import {AppCookieService} from "../services/app-cookie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = "";

  hide = true;

  username = new FormControl('',[
    Validators.required]);
  password = new FormControl('',[
    Validators.required]);

  constructor(private userService:UserService,
              private cookieService:AppCookieService,
              private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
    this.userService.login(this.username.value,this.password.value).subscribe(
      (response:RestBody) => {
        if (response.code != 200){
          this.message = "You submit a wrong username or password, please try agagin.";
        }
        else{
          this.cookieService.set("token",response.data['token']);

          this.router.navigate(["/"]);
        }

      }
    );

  }

  closeTip(){
    this.message ="";
  }


}
