import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GenreService } from '../../../../../genre.service';
import { UserService } from '../../../../../user.service';
import { SharedService } from '../../../../../../../shared/shared.service';

@Component({
  selector: 'app-publishertransactionaddon',
  templateUrl: './publishertransactionaddon.component.html',
  styleUrls: ['./publishertransactionaddon.component.scss']
})
export class PublishertransactionaddonComponent implements OnInit, OnDestroy {
  id: number;
  private subscription = new Map<String, Subscription>();
  loading: boolean = false;
  form: FormGroup;
  photo: File;
  genres: any;
  isSearch: boolean;
  authors: any;
  authorID: any;
  imgSrc: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private genreSerivce: GenreService,
    private userService: UserService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
      }));
    this.form = this.fb.group({
      'userName': null,
      'firstName': null,
      'lastName': null,
      'biography': null,
      'avatar': null,
      'genreID': null
    });
    this.allGenre();
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
      this.form.get('avatar').setValue(this.photo);
    }
  }

  addCopyWriter() {
    const copyWriterData = this.prepareSave();
    this.loading = true;
    this.subscription.set('copyWriterSub', this.userService.
      addCopyWriter(copyWriterData)
      .subscribe((res) => {
        const copyPubData = { id: res, pubId: this.id }
        this.subscription.set('copyWriterPubSub', this.userService
          .addCopyWriterPub(copyPubData).subscribe(() => {
            this.loading = false;
            this.sharedService.openSnackBar('Copywriter Added', null, { duration: 2000 })
            this.imgSrc = null;
            this.form.reset();
            window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
          }))
      }))
  }

  private prepareSave() {
    let input = new FormData();
    if (this.photo) {
      input.append('avatar', this.photo, this.photo.name);
    }
    input.append('userName', this.form.get('userName').value);
    input.append('firstName', this.form.get('firstName').value);
    input.append('lastName', this.form.get('lastName').value);
    input.append('biography', this.form.get('biography').value);
    input.append('genreID', this.form.get('genreID').value);
    input.append('role', 'writer');
    return input;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
