import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/pages/users/user.service';
import { GenreService } from 'src/app/pages/users/genre.service';
import { SharedService } from 'src/app/shared/shared.service';
import { PublisherService } from '../../../../publisher.service';
import { CopywriterService } from 'src/app/pages/users/copywriter.service';

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
  searchedUser: any;
  isSearching: boolean;
  attachment: File;
  authorId:  number;
  private subscription = new Map<String, Subscription>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private genreSerivce: GenreService,
    private publisherService: PublisherService,
    private sharedService: SharedService,
    private copyWriterService: CopywriterService
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
        'genreID': null,
        'attachment': null,
        'title': null,
        'recepient': null
      });
      
    this.allGenre();
  }

  selectUser(data) {
    this.form.get('recepient').setValue(`${data.firstName} ${data.lastName}`);
    this.authorId = data.id;
    this.searchedUser = null;
  }

  search(term) {
    this.isSearching = true;
    this.subscription.set('searchUserSubscription', this.publisherService
      .searchUser(term)
      .subscribe(res => {
        this.isSearching = false;
        if (res.length == []) {
          this.searchedUser = null;
          return;
        }

        this.searchedUser = res;
      }));
  }

  addAttachment(event) {
    if (event.target.files.length > 0) {
      this.attachment = event.target.files[0];
      this.form.get('attachment').setValue(this.attachment);
    }
  }

  allGenre() {
    this.subscription.set('genreSubscription', this.genreSerivce
      .allGenre().subscribe(res => {
        this.genres = res;
      }));
  }

  assignCopyWriter() {
    const assignCopyWriterData = this.prepareSave();
    this.loading = true;
    this.subscription.set('assignCopyWriter', this.copyWriterService
    .assignCopyWriter(assignCopyWriterData)
    .subscribe(res => {
      this.loading = false;
      this.sharedService.openSnackBar('Copywriter Assigned', null, { duration: 2000 })
      this.imgSrc = null;
      this.form.reset();
      window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
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
    input.append('copywriterId', `${this.copyId}`);
    input.append('genreID', this.form.get('genreID').value);
    input.append('authorId', `${this.authorId}`);
    input.append('title', this.form.get('title').value);
    input.append('attachment', this.form.get('attachment').value);
    input.append('status', 'pending');  
    return input;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
