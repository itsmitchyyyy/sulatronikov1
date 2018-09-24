import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PublisherService } from '../../../../../publishers/publisher.service';
import { SharedService } from '../../../../../../../shared/shared.service';
import { GenreService } from '../../../../../genre.service';

@Component({
  selector: 'app-authoraddmanuscript',
  templateUrl: './authoraddmanuscript.component.html',
  styleUrls: ['./authoraddmanuscript.component.scss']
})
export class AuthoraddmanuscriptComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  imgSrc: any;
  genres: any;
  photo: File;
  formGroup: FormGroup;
  attachment: File;
  loading;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private publisherService: PublisherService,
    private sharedService: SharedService,
    private genreSerivce: GenreService
  ) { }

  ngOnInit() {
    this.subscription.set('routerSubscription', this.router
      .params.subscribe(params => {
        this.id = +params['id'];
      }));
    this.formGroup = this.formBuilder.group({
      'title': null,
      'genreID': null,
      'sypnosis': null,
    });
    this.allGenre();
  }

  addAttachment(event) {
    if (event.target && event.target.files[0]) {
      this.attachment = event.target.files[0];
    }
  }

  filePreview(event) {
    if (event.target && event.target.files[0]) {
      this.photo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(this.photo);

    }
  }

  allGenre() {
    this.subscription.set('genreSubscription', this.genreSerivce
      .allGenre().subscribe(res => {
        this.genres = res;
      }));
  }

  addManuscript() {
    const bookData = this.prepareSave();
    this.loading = true;
    this.publisherService.addBook(bookData).subscribe(() => {
      this.loading = false;
      this.sharedService.openSnackBar('Manuscript Added', null, { duration: 2000 })
      this.imgSrc = null;
      this.formGroup.reset();
      window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
    }, (error => {
      this.sharedService.openSnackBar('An error occured', null, { duration: 2000 });
      this.loading = false;
    }));
  }

  private prepareSave() {
    let input = new FormData();
    if (this.photo) {
      input.append('photo', this.photo, this.photo.name);
    }
    if (this.attachment) {
      input.append('attachment', this.attachment, this.attachment.name);
    }
    input.append('title', this.formGroup.get('title').value);
    input.append('sypnosis', this.formGroup.get('sypnosis').value);
    input.append('authorID', `${this.id}`);
    input.append('genreID', this.formGroup.get('genreID').value);
    return input;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
