import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {RestBody} from "../../entity/response";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AppCookieService} from "../../services/app-cookie.service";
import {LibraryService} from "../../services/library.service";
import {FormBuilder, FormControl, FormGroup, FormGroupName, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  //when you want to display the footer, set this to true
  displayFooter:boolean = true;

  presentLibrary:String[] = [];

  libraryName = new FormControl();

  linear = true;
  nameForm:FormGroup = this.fb.group(
    {
      library_name:[,[Validators.required]]
    }
  );

  fileFiled:FormControl = new FormControl();



  constructor(private userService:UserService,
              private toastr:ToastrService,
              private router:Router,
              private cookieService:AppCookieService,
              private libraryService:LibraryService,
              private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.checkLogin().subscribe({
      error: err => {
          this.toastr.warning("Authenticate fail, pleas login.", "Bad Authentication");
          this.router.navigate(['login']);
          this.cookieService.clear();
      }
      }
    )
    this.libraryService.getAllLibrary().subscribe(
      (res:RestBody)=>{
        Object.keys(res.data).forEach(
          key =>{
            this.presentLibrary.push(res.data[key] as String)
        }
        )
      }
    )

  }

  nameConfirm(){
    let name = this.nameForm.get("library_name")?.value;
    if (name != ""){
      this.libraryService.createLibrary(name).subscribe(
        (res:RestBody)=>{
          if (res.code == 200){
            this.presentLibrary.push(name);
          }
        }
      );
    }
  }

}
