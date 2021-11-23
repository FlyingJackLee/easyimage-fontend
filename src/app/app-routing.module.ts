import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";


const routes:Routes = [
  {path:'',component:HomepageComponent,data:{animation:"HomePage"}},
  {path:'login',component:LoginComponent,data:{animation:"LoginPage"}},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
