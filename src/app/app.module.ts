import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { HomepageComponent } from './components/homepage/homepage.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import { SignupComponent } from './components/signup/signup.component';
import { UploadComponent } from './components/upload/upload.component';
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatStepperModule} from "@angular/material/stepper";
import {FileUploadModule} from "ng2-file-upload";
import { LibraryListComponent } from './components/library-list/library-list.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { LibraryDetailComponent } from './components/library-detail/library-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    HomepageComponent,
    SignupComponent,
    UploadComponent,
    LibraryListComponent,
    ImageCardComponent,
    LibraryDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right'
      }
    ),
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatStepperModule,
    FileUploadModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
