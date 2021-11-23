import { Component } from '@angular/core';
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {RouterOutlet} from "@angular/router";
import {slideInAnimation} from "../animation";

interface Link{
  title:string,
  path:string,
  footer:boolean
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


  links:Link[] = [
    {title:"Home",path:"/",footer:false},
    {title:"Upload",path:"/upload",footer:false},
    {title:"Contact Us",path:"/contact",footer:false},
    {title:"About Us",path:"/about",footer:false},
    {title:"Login",path:"/login",footer:true},
    {title:"Sign up",path:"/signup",footer:false},
  ]

  activateLink:Link = this.links[0];

  prepareRoute(outlet: RouterOutlet) {
    return  outlet?.activatedRouteData?.['animation'];
  }

}

