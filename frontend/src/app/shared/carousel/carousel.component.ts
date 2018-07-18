import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  imageUrls = [
    {
      url: 'http://via.placeholder.com/350x150', 
      caption: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
      url: 'http://via.placeholder.com/350x200', 
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      url: 'http://via.placeholder.com/350x250', 
      caption: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    },
  ]
  constructor() { }

  ngOnInit() {

  }

}
