import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {SignupComponent} from "./components/signup/signup.component";
import {UploadComponent} from "./components/upload/upload.component";


const routes:Routes = [
  {path:'',component:HomepageComponent,data:{animation:"HomePage"}},
  {path:'login',component:LoginComponent,data:{animation:"LoginPage"}},
  {path:'signup',component:SignupComponent,data:{animation:"Signup"}},
  {path:'upload',component:UploadComponent,data:{animation:"Signup"}},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
