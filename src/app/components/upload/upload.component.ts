import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {RestBody} from "../../entity/response";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AppCookieService} from "../../services/app-cookie.service";
import {LibraryService} from "../../services/library.service";
import {FormBuilder, FormControl, FormGroup, FormGroupName, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {AppSettings} from "../../constant/AppSettings";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  //when you want to display the footer, set this to true
  displayFooter:boolean = true;

  presentLibrary:String[] = [];

  linear = true;
  nameForm:FormGroup = this.fb.group(
    {
      library_name:[,[Validators.required]]
    }
  );


  selectedFiles?:FileList;
  progressInfos:any[] = [];
  isUploadCompleted:boolean = false;

  constructor(private userService:UserService,
              private toastr:ToastrService,
              private router:Router,
              private cookieService:AppCookieService,
              private libraryService:LibraryService,
              private fb:FormBuilder
  ) {

  }

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
        console.log(res);
        Object.keys(res.data).forEach(
          key =>{
            this.presentLibrary.push(key as String)
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

  selectFiles(event:any): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }


  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.libraryService.upload(file,this.nameForm.get("library_name")?.value).subscribe(
        {
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);

            } else if (event instanceof HttpResponse) {
              this.toastr.success('Uploaded the file successfully: ' + file.name,"Upload complete");
              this.checkIsAllUploaded()
            }
          },
          error: (err: any) => {
            this.progressInfos[idx].value = 0;
            this.toastr.warning('Could not upload the file: ' + file.name,"Upload complete");
          },
        })
    }
  }


  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  checkIsAllUploaded(){
    let complete = true;

    if (this.progressInfos.length == 0){
      return ;
    }

    for (const progressInfo of this.progressInfos) {
      if (progressInfo.value!= 100){
        complete = false;
        break;
      }
    }

    this.isUploadCompleted = complete;
  }

  goHome(){
    this.router.navigate([""]);
  }
}
