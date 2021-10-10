import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input('srcImages') srcImages: String[];
  public mySwiper: Swiper;

  constructor(private publicacionService: PublicacionService) {}

  ngOnInit(): void {
    console.log(this.srcImages);
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }
}
