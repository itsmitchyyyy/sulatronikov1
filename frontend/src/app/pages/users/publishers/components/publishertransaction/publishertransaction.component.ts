import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PublisherService } from '../../publisher.service';

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
  photo: File;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private publisherService: PublisherService
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
      this.photo = event.target.files[0];
      this.form.get('photo').setValue(this.photo);
    }
  }

  submitBook() {
    const bookData = this.prepareSave();
    this.loading = true;
    this.publisherService.addBook(bookData).subscribe(() => {
      this.loading = false;
    });
  }

  private prepareSave() {
    let input = new FormData();
    input.append('photo', this.photo, this.photo.name);
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
