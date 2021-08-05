import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})
export class TitlePageComponent implements OnInit {

  title: string;
  @Input('titlePage') valor: string;

  constructor() {}

  ngOnInit(): void {
    this.title = this.valor;
  }

}
