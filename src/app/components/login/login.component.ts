import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validator, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {RestBody} from "../../entity/response";
import {AppCookieService} from "../../services/app-cookie.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {timeout} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //when you want to display the footer, set this to true
  displayFooter:boolean = true;

  hide = true;

  username = new FormControl('',[
    Validators.required]);
  password = new FormControl('',[
    Validators.required]);

  constructor(private userService:UserService,
              private cookieService:AppCookieService,
              private router:Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  submit(){
    this.userService.login(this.username.value,this.password.value).subscribe(
      (response:RestBody) => {
        if (response.code != 200){
          this.toastr.warning("You submit a wrong username or password, please try again.",
            "Login error",
            {timeOut:3000}
          )
        }

        else{
          this.cookieService.set("token",response.data['token'] as string);
          this.cookieService.set("username",this.username.value);
          this.cookieService.set("isLogin","success");

          this.toastr.success("You login in now!")
          this.router.navigate([""]);

        }
      }
    );

  }

  goToSignUp(){
    this.router.navigate(["signup"]);
  }

}
