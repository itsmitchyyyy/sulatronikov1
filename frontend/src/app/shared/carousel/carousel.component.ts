import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  imageUrls = [
    {
      url: '../../../assets/images/coverv1.jpg', 
    },
    {
      url: '../../../assets/images/coverv2.jpg', 
    },
    {
      url: '../../../assets/images/coverv3.jpg', 
    },
  ]
  constructor() { }

  ngOnInit() {

  }

}
