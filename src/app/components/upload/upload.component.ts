import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {RestBody} from "../../entity/response";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AppCookieService} from "../../services/app-cookie.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  //when you want to display the footer, set this to true
  displayFooter:boolean = true;

  constructor(private userService:UserService,
              private toastr:ToastrService,
              private router:Router,
              private cookieService:AppCookieService
  ) { }

  ngOnInit(): void {
    this.userService.checkLogin().subscribe({
      error: err => {
          this.toastr.warning("Authenticate fail, pleas login.", "Bad Authentication");
          this.router.navigate(['login']);
      }
      }
    )
  }

}
