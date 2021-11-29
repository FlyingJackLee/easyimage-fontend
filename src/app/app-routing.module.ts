import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {SignupComponent} from "./components/signup/signup.component";
import {UploadComponent} from "./components/upload/upload.component";
import {LibraryListComponent} from "./components/library-list/library-list.component";
import {LibraryDetailComponent} from "./components/library-detail/library-detail.component";


const routes:Routes = [
  {path:'',component:HomepageComponent,data:{animation:"HomePage"}},
  {path:'login',component:LoginComponent,data:{animation:"LoginPage"}},
  {path:'signup',component:SignupComponent,data:{animation:"Signup"}},
  {path:'upload',component:UploadComponent,data:{animation:"Upload"}},
  {path:'library',component:LibraryListComponent,data:{animation:"libraryList"}},
  {path:'library/:name',component:LibraryDetailComponent,data:{animation:"libraryDetail"}},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
