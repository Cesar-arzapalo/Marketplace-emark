import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }
  imagesForSlider = [
    {path: 'https://imgur.com/yURWdnK.png'},
    {path: 'https://imgur.com/49CyQdj.png'},
    {path: 'https://imgur.com/WPGX9gt.png'}, 
  ];

  ngOnInit(): void {
  }

}
