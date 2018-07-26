import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  fakeArray = new Array(12);
  generateRandomNumbers = Math.floor(Math.random() * (10 - 1)) + 1;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
}
