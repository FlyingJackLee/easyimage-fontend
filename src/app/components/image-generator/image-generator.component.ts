import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Image, Tag} from "../../entity/image";
import {LibraryService} from "../../services/library.service";
import * as html2canvas from "html2canvas";
import {AppSettings} from "../../constant/AppSettings";
import {stringify} from "@angular/compiler/src/util";
import {image} from "html2canvas/dist/types/css/types/image";




@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.css']
})
export class ImageGeneratorComponent implements AfterViewInit,OnInit {
  @ViewChild("imageSource")
  imageSource:ElementRef;

  @ViewChild("canvas")
  canvas:ElementRef;

  @ViewChild("downloadLink")
  downloadLink:ElementRef;

  image_base_url = AppSettings.IMG_URL;

  imageGroups:{
    [key:string]:Image[]
  } = {};

  tagStyleCount:number = 1;

  constructor(private libraryService:LibraryService) {
    this.imageGroups["Others"]=[];
  }


  allTags():string{
    let tags:string = '';

    Object.getOwnPropertyNames(this.imageGroups).forEach((key)=>{
      if (key.toLocaleLowerCase() != "others")
      {
        tags += "," + key;
      }
    })
    return tags;
  }

  ngOnInit() {
      this.libraryService.getSelectedImages().subscribe(
        (img:Image) =>{
          let tags:Tag[] = img.tags;

          if (tags.length <= 0){
            this.imageGroups["Others"].push(img);
          }
          else {
            for (const tag of tags) {
              //if not exist, create a new group
              if (!this.imageGroups.hasOwnProperty(tag.type)){
                this.imageGroups[tag.type] = [];
              }
              this.imageGroups[tag.type].push(img);
            }
          }
        }
      );
  }

  ngAfterViewInit(): void {

  }


  tagStyle():number{
    this.tagStyleCount += 1;
    if (this.tagStyleCount == 4){
      this.tagStyleCount = 1;
    }
    return this.tagStyleCount;
  }

  styleGenerate(index:number):string{
    return AppSettings.styleGenerate(index);
  }


  downloadImage(){
    // @ts-ignore
    html2canvas(this.imageSource.nativeElement,{
      useCORS: true
    }).then(
        (canvas: { toDataURL: (arg0: string) => any; }) =>{
        // @ts-ignore
          // this.canvas.nativeElement.src = canvas.toDataURL();
        this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
        this.downloadLink.nativeElement.download = 'composite.png';
        this.downloadLink.nativeElement.click();
      }
    )
  }



}
