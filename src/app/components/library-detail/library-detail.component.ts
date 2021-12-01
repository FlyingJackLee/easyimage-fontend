import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {AppCookieService} from "../../services/app-cookie.service";
import {LibraryService} from "../../services/library.service";
import {RestBody} from "../../entity/response";
import {AppSettings} from "../../constant/AppSettings";
import {Image} from "../../entity/image";



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

  constructor(
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private libraryService:LibraryService,
    private router:Router
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

                if (this.images.length <= 0){
                  this.toastr.warning("No image, please upload!","No image");
                  this.router.navigate(['/upload']);
                }

              }}
          )
      },
    })

    this.libraryService.clearSelectedImages();
  }

  styleGenerate(index:number):string{
    return AppSettings.styleGenerate(index);
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
  }

  goToImageGenerator(){
    this.libraryService.selectImages(this.selectedImages);
    this.router.navigate(["/generate"],);
  }

  isDetected(state:string):boolean{
    if (state != "DONE"){
      return false;
    }
    return true;
  }

}
