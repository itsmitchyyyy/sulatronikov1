import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-publishertransaction',
  templateUrl: './publishertransaction.component.html',
  styleUrls: ['./publishertransaction.component.scss']
})
export class PublishertransactionComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  loading: boolean = false;
  form: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
      }));
    this.form = this.fb.group({
      'photo': null,
      'title': null,
      'sypnosis': null,
      'authorID': null,
      'genreID': null
    });
  }

  fileUpload(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('photo').setValue(file);
    }
  }

  submitBook() {
    const bookData = this.prepareSave();
   
  }

  private prepareSave() {
    let input = new FormData();
    input.append('photo', this.form.get('photo').value);
    input.append('title', this.form.get('title').value);
    input.append('sypnosis', this.form.get('sypnosis').value);
    input.append('authorID', this.form.get('authorID').value);
    input.append('genreID', this.form.get('genreID').value);
    return input;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
