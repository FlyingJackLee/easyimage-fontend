import { Component } from '@angular/core';
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {Router, RouterOutlet} from "@angular/router";
import {slideInAnimation} from "../animation";
import {LoginComponent} from "./components/login/login.component";
import {UserService} from "./services/user.service";
import {RestBody} from "./entity/response";
import {AppCookieService} from "./services/app-cookie.service";
import {ToastrService} from "ngx-toastr";

interface Link{
  title:string,
  path:string,
  footer:boolean,
  hide:boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    slideInAnimation
  ],
})
export class AppComponent {
  title = 'easyimage-frontend';

  isFooterDisplay:boolean = false;

  //true means need sign in, false means already singed in(log out enable).
  signInOrLogOut:boolean = true;

  constructor(private userService:UserService,
              private cookieService:AppCookieService,
              private router:Router,
              private toastr:ToastrService) {
  }


  links:Link[] = [
    {title:"Home",path:"/",footer:false,hide:false},
    {title:"Upload",path:"/upload",footer:false,hide:false},
    {title:"Contact Us",path:"/contact",footer:false,hide:false},
    {title:"About Us",path:"/about",footer:false,hide:false},
    // {title:"Login",path:"/login",footer:true,hide:false},
    // {title:"Sign up",path:"/signup",footer:false,hide:false},
    // {title:"Log out",path:"/logout",footer:false,hide:true},
  ]

  activateLink:Link = this.links[0];

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  goToLoginPage(){
    this.router.navigate(["/login"]);
  }

  goToSingUpPage(){
    this.router.navigate(["/signup"]);
  }

  ngOnInit(){
    this.refreshAccountArea();
  }

  displayFooter(event:any){
    this.isFooterDisplay = event.displayFooter;
  }

  refreshAccountArea(){
    this.signInOrLogOut = !(this.cookieService.get("isLogin") == "success");
  }

  logout(){
    this.userService.logout().subscribe((response:RestBody)  =>{
        if (response.code == 200){
            this.toastr.success("You have already existed.","Log Out",{
              timeOut:3000
            });
        }
        this.cookieService.remove("username");
        this.cookieService.remove("token");
        this.cookieService.remove("isLogin");

        this.refreshAccountArea();
    });
  }
}

