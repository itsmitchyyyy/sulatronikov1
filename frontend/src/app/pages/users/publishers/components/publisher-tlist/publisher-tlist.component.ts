import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publisher-tlist',
  templateUrl: './publisher-tlist.component.html',
  styleUrls: ['./publisher-tlist.component.scss']
})
export class PublisherTlistComponent implements OnInit {
  fakeArray = new Array(12);
  generateRandomNumbers = Math.floor(Math.random() * (10 - 1)) + 1;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
