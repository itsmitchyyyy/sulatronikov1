import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authormanuscript',
  templateUrl: './authormanuscript.component.html',
  styleUrls: ['./authormanuscript.component.scss']
})
export class AuthormanuscriptComponent implements OnInit {
  fakeArray = new Array(10);

  constructor() { }

  ngOnInit() {
  }

}
