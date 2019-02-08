import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/pages/users/user.service';
import { GenreService } from 'src/app/pages/users/genre.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-publishertransactionassign',
  templateUrl: './publishertransactionassign.component.html',
  styleUrls: ['./publishertransactionassign.component.scss']
})
export class PublishertransactionassignComponent implements OnInit, OnDestroy {

  id: number;
  photo: File;
  form: FormGroup;
  userData: any;
  imgSrc: any;
  copyId: number;
  genres: any;
  loading: boolean = false;
  private subscription = new Map<String, Subscription>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private genreSerivce: GenreService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
      params.subscribe(params => {
        this.id = +params['id'];
        this.copyId = + params['copyId'];
      }));
      if (this.copyId != null) {
        this.userProfile();
      }

      this.form = this.fb.group({
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

  assignCopyWriter() {
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


  fileUpload(event) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(this.photo);
      this.form.get('avatar').setValue(this.photo);
    }
  }

  userProfile() {
    this.subscription.set('profileSubscription', this.userService.
      getUser(this.copyId).subscribe((data => {
        this.userData = data;
        if (data.avatar) {
          this.imgSrc = data.avatar;
        }
      })));
  }

  private prepareSave() {
    let input = new FormData();
    input.append('genreID', this.form.get('genreID').value);
    return input;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
