import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GenreService } from '../../../../../genre.service';
import { SharedService } from '../../../../../../../shared/shared.service';
import { PublisherService } from '../../../../../publishers/publisher.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManuscriptService } from '../../../../../manuscript.service';

@Component({
  selector: 'app-authorviewmanuscript',
  templateUrl: './authorviewmanuscript.component.html',
  styleUrls: ['./authorviewmanuscript.component.scss']
})
export class AuthorviewmanuscriptComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  imgSrc: any;
  genres: any;
  photo: File;
  formGroup: FormGroup;
  attachment: File;
  loading;
  manuscriptId: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private publisherService: PublisherService,
    private sharedService: SharedService,
    private genreSerivce: GenreService,
    private manuscriptService: ManuscriptService
  ) { }

  ngOnInit() {
    this.subscription.set('routerSubscription', this.router
      .params.subscribe(params => {
        this.id = +params['id'];
        if (params.hasOwnProperty('manuscriptId')) {
          this.manuscriptId = +params['manuscriptId'];
        }
      }));
    this.formGroup = this.formBuilder.group({
      'title': null,
      'genreID': null,
      'sypnosis': null,
    });
    this.getManuscript();
    this.allGenre();
  }

  getManuscript() {
    this.subscription.set('manuscriptSub', this.manuscriptService
      .editManuscript(this.manuscriptId)
      .subscribe(res => {
        this.formGroup.get('title').setValue(res.title);
        this.formGroup.get('sypnosis').setValue(res.sypnosis);
        this.formGroup.get('genreID').setValue(res.genreID);
        this.imgSrc = res.photo;
      }))
  }

  addAttachment(event) {
    if (event.target && event.target.files[0]) {
      this.attachment = event.target.files[0];
    }
  }

  deleteManuscript() {
    if (confirm("Are you sure you want to delete this manuscript?")) {
      this.subscription.set('delManuscriptSub', this.manuscriptService
        .deleteManuscript(this.manuscriptId)
        .subscribe(() => {
          this.sharedService.openSnackBar('Manuscript deleted', null, { duration: 2000 })
          window.history.back();
        }));
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

  updateManuscript() {
    const bookData = this.prepareSave();
    this.loading = true;
    this.manuscriptService.updateManuscript(bookData).subscribe(() => {
      this.loading = false;
      this.sharedService.openSnackBar('Manuscript Updated', null, { duration: 2000 })
      this.imgSrc = null;
      this.formGroup.reset();
      window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
      window.history.back();
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
    input.append('id', `${this.manuscriptId}`);
    return input;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
