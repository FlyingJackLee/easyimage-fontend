import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements OnInit,AfterViewInit {
  @Input() cardType:string = "";
  @Input() url:string = "";
  @Input() cardTitle:string ="";
  @Input() extensionPosition:string = "right";
  @Input() hideTitle:boolean = false;
  @Input() unlockHeight:boolean = false;
  // @Input() hideButton:boolean = true;
  // @Input() buttonIcon:string = "fmd_good";

  @ViewChild("webCard")
  imageView:ElementRef;

  extensionClass:string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.extensionPosition == "right"){
      this.extensionClass = "web-image-card-extension-right";
    }
    else if(this.extensionPosition == "right-close"){
      this.extensionClass = "web-image-card-extension-right-close";
    }


  }

  ngAfterViewInit():void{
    if (this.unlockHeight == true){
      this.imageView.nativeElement.style.setProperty("height","auto");
    }

  }
}
