import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }
  imagesForSlider = [
    {path: 'https://imgur.com/1IVyVq0.png'},
    {path: 'https://imgur.com/tBTZjqJ.png'},
    {path: 'https://imgur.com/iN9KQVF.png'}, 
  ];

  ngOnInit(): void {
  }

}
