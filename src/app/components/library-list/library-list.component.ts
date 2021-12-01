import { Component, OnInit } from '@angular/core';
import {LibraryService} from "../../services/library.service";
import {RestBody} from "../../entity/response";
import {AppSettings} from "../../constant/AppSettings";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {AppCookieService} from "../../services/app-cookie.service";

interface Library{
  name:string,
  cover:string,
}

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit {
  libraries:Library[] = [];

  constructor(
    private libraryService:LibraryService,
    private router:Router,
    private userService:UserService,
    private toastr:ToastrService,
    private cookieService:AppCookieService
    ) {

  }

  ngOnInit(): void {
    this.userService.checkLogin().subscribe({
        next: ()=>{
          this.libraryService.getAllLibrary().subscribe({
            next:(res:RestBody)=>{
              Object.keys(res.data).forEach(
                (key)=>{
                  this.libraries.push(
                    {
                      name:key,
                      cover: AppSettings.IMG_URL + (res.data[key] as string)
                    }
                  );
                }
              );
              if (this.libraries.length <= 0){
                this.toastr.warning("No Library, please create a new one!","No library");
                this.router.navigate(['/upload']);
              }
            },
          });
        },
        error: err => {
          this.toastr.warning("Authenticate fail, pleas login.", "Bad Authentication");
          this.router.navigate(['login']);
          this.cookieService.clear();
        }
      }
    )

  }

  goToLibrary(name:string){
    this.router.navigate(['library',name],)
  }



}
