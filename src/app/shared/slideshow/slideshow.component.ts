import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input('srcImages') srcImages: String[];
  public mySwiper: Swiper;

  constructor(private cdfRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log(this.srcImages);
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: false,
    });
  }

  public sliderNext() {
    console.log(this.mySwiper);
    this.mySwiper.slideNext();
  }

  public sliderPrevious() {
    this.mySwiper.slidePrev();
  }

}
