import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  @Input('srcImages') srcImages: String[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.srcImages)
  }

}
