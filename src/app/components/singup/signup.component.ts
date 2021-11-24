import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {PasswordErrorStateMatcher} from "../../filter/error.matcher";
import {UserService} from "../../services/user.service";
import {RestBody} from "../../entity/response";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";





@Component({
  selector: 'app-singup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //when you want to display the footer, set this to true
  displayFooter:boolean = true;

  passwordMatcher = new PasswordErrorStateMatcher();
  // usernameMatcher = new UsernameErrorStateMatcher();


  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password') != null ? group.get('password')?.value as string:"";
    let confirmPass = group.get('confirmPassword') != null ? group.get('confirmPassword')?.value as string:"";
    return pass === confirmPass ? null : { notSame: true }
  };


  existUserNames:string[] = [];

  // checkUserName:ValidatorFn = (formControl:AbstractControl):ValidationErrors | null =>{
  //   let username = formControl.value;
  //
  //   if (username in this.existUserNames){
  //     return   {unavailable:true };
  //   }
  //   else {
  //     return null;
  //   }
  // };

  username = new FormControl('',[
    Validators.required
     // ,this.checkUserName
  ]);

  email = new FormControl('',[
    Validators.required,Validators.email]);

  hide = true;

  passwordForm = this.fb.group(
    {
      password: ['',[Validators.required,Validators.min(6)]],
      confirmPassword:['']
    },{validators:this.checkPasswords}
  )



  constructor(private fb: FormBuilder,
    private userService:UserService,
    private toastr:ToastrService,
              private router:Router
  ) { }

  ngOnInit(): void {
  }

  submit(){

     this.userService.signup(this.username.value,this.passwordForm.get("password")?.value,this.email.value).subscribe(
      (response:any)=>{
        if (response.code == 900){
             this.username.reset();
             this.toastr.warning("Username has been used. Try another","Username unavailable");
        }
        else if (response.code == 200){
          this.toastr.success("Create account successfully, you can login now!","Create successfully");
          this.router.navigate(["login"]);
        }
        else{
          this.toastr.warning("Unknown error try again");
        }
       });

    // if (username != null && username.length > 0){
    //   this.userService.checkUserName(username).subscribe(
    //     (response:RestBody)=>{
    //       console.log(response);
    //       isExist = response.code == 200;
    //       console.log(isExist + "inside");
    //
    //     }
    //   )
    // }
  }

  resetAll(){
    this.username.reset();
    this.passwordForm.reset();
    this.email.reset();
  }

}
