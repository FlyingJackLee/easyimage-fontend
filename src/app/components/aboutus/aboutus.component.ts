import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  //when you want to display the footer, set this to true
  displayFooter:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
