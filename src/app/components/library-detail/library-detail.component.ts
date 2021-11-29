import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {AppCookieService} from "../../services/app-cookie.service";
import {LibraryService} from "../../services/library.service";
import {RestBody} from "../../entity/response";
import {AppSettings} from "../../constant/AppSettings";

interface Tag{
  id:number,
  type:string
}

interface Image{
  id:number,
  name:string,
  filePath:string,
  state:string,
  tags:Tag[],
  uploadDate:Date,

}

@Component({
  selector: 'app-library-detail',
  templateUrl: './library-detail.component.html',
  styleUrls: ['./library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
  basePath:string= AppSettings.IMG_URL;
  libraryName:string = "";

  images:Image[] = [];
  selectedImages:Image[] = [];

  loopClass:string[] = [
    "web-image-card-big-1",
    "web-image-card-small-2","web-image-card-small-2","web-image-card-small-2",
    "web-image-card-middle-3","web-image-card-middle-3"
  ]

  constructor(
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private libraryService:LibraryService
  ) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(map:ParamMap)=>{
        this.libraryName = map.get("name") as string;
        this.libraryService.getAllImages(this.libraryName)
          .subscribe(
            {
              next:(res:RestBody)=>{
                Object.keys(res.data).forEach(
                  (key)=>{
                    if (res.data[key] != null){
                      // @ts-ignore
                      this.images.push(res.data[key]);
                    }
                  }
                );

              }}
          )
      },
    })
  }

  styleGenerate(index:number):string{
    let classes:string = this.loopClass[index%6];
    if(index%6 == 2){
      classes += " web-image-card-small-gap";
    }
    else if(index%6 == 4){
      classes += " web-image-card-middle-gap";
    }
    return classes;
  }

  select(image:Image){
    if (this.selectedImages.indexOf(image) < 0){
      this.selectedImages.push(image);
    }
  }
  unselect(selectedImage:Image){
    this.selectedImages = this.selectedImages.filter((image:Image)=>{
      return image != selectedImage;
    });
    console.log(this.selectedImages);
  }
}
