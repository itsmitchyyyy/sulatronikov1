import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PublisherService } from '../../../../publisher.service';
import { GenreService } from '../../../../../genre.service';
import { UserService } from '../../../../../user.service';
import { SharedService } from '../../../../../../../shared/shared.service';
import { ManuscriptService } from '../../../../../manuscript.service';

@Component({
  selector: 'app-publisheditmanuscript',
  templateUrl: './publisheditmanuscript.component.html',
  styleUrls: ['./publisheditmanuscript.component.scss']
})
export class PublisheditmanuscriptComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  loading: boolean = false;
  form: FormGroup;
  photo: File;
  genres: any;
  isSearch: boolean;
  searchAuthor$ = new Subject<string>();
  authors: any;
  authorID: any;
  imgSrc: any;
  copyWriter: any;
  bookID: any;
  manuscript: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private publisherService: PublisherService,
    private genreSerivce: GenreService,
    private userService: UserService,
    private manuscriptService: ManuscriptService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
        if (params.hasOwnProperty('bookID')) {
          this.bookID = +params['bookID'];
          this.getManuscript();

        }
      }));
    this.form = this.fb.group({
      'photo': null,
      'title': null,
      'sypnosis': null,
      'author': null,
      'genreID': null
    });
    this.allGenre();
  }

  getManuscript() {
    this.subscription.set('manuscriptSub', this.manuscriptService
      .editManuscript(this.bookID)
      .subscribe(res => {
        this.form.get('title').setValue(res.title);
        this.form.get('sypnosis').setValue(res.sypnosis);
        this.form.get('author').setValue(`${res.firstName} ${res.lastName}`);
        this.authorID = res.authorID;
        this.form.get('genreID').setValue(res.genreID);
        this.imgSrc = res.photo;
      }))
  }

  allGenre() {
    this.subscription.set('genreSubscription', this.genreSerivce
      .allGenre().subscribe(res => {
        this.genres = res;
      }));
  }

  fileUpload(event) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(this.photo);
      this.form.get('photo').setValue(this.photo);
    }
  }

  authorSearch(text) {
    this.isSearch = true;
    this.searchAuthor$.next(text)
    this.subscription.set('searchSubscription', this.userService
      .search(this.searchAuthor$)
      .subscribe(res => {
        if (res === 'E') {
          this.isSearch = false;
          return;
        }
        this.authors = res;
      }))
  }

  getAuthor(id) {
    this.isSearch = false;
    this.subscription.set('authorSubscription', this.userService
      .getUser(id).subscribe(res => {
        this.authorID = res.id;
        this.form.get('author').setValue(`${res.firstName} ${res.lastName}`)
      }));
  }

  deleteManuscript() {
    this.subscription.set('deleteManuscript', this.manuscriptService
      .deleteManuscript(this.bookID)
      .subscribe(() => {
        this.sharedService.openSnackBar('Book deleted', null, { duration: 2000 });
        window.history.back();
      }))
  }

  submitBook() {
    const bookData = this.prepareSave();
    this.loading = true;
    this.manuscriptService.updateManuscript(bookData).subscribe(() => {
      this.loading = false;
      this.sharedService.openSnackBar('Book Updated', null, { duration: 2000 })
      this.imgSrc = null;
      this.form.reset();
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
    input.append('title', this.form.get('title').value);
    input.append('sypnosis', this.form.get('sypnosis').value);
    input.append('authorID', this.authorID);
    input.append('publisherID', `${this.id}`);
    input.append('genreID', this.form.get('genreID').value);
    input.append('id', this.bookID);
    return input;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
