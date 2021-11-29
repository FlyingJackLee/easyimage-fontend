import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements OnInit {
  @Input() cardType:string = "";
  @Input() url:string = "";
  @Input() cardTitle:string ="";
  @Input() extensionPosition:string = "right";
  // @Input() hideButton:boolean = true;
  // @Input() buttonIcon:string = "fmd_good";

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

  }
}
