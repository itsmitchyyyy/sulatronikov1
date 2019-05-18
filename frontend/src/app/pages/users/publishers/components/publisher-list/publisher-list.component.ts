import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user.service';
import { LoginService } from '../../../../../shared/login/login.service';
import { MatIcon } from '@angular/material';
import { PublisherService } from '../../publisher.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss']
})
export class PublisherListComponent implements OnInit, OnDestroy {
  loading = false;
  id: number;
  private subscription = new Map<String, Subscription>();
  publisher: any;
  currentUser: any;
  rating: number;
  private textReview: ElementRef;
  @ViewChildren('starRating') starRating: QueryList<MatIcon>;
  @ViewChild('textReview') set content(content: ElementRef) {
    this.textReview = content;
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService,
    private publisherService: PublisherService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route
      .params.subscribe(param => {
        this.id = +param['id'];
      }));
    this.userLogged();
    this.publisherProfile();
  }

  publisherProfile() {
    this.subscription.set('publisherSubscription', this.userService
      .getUser(this.id).subscribe(res => {
        this.publisher = res;
      }));
  }

  userLogged() {
    this.subscription.set('userSubscription', this.loginService
      .getLoggedIn().subscribe(res => {
        this.currentUser = res;
      }));
  }

  get messageRoute() {
    if (this.currentUser) {
      return `/${this.currentUser.roles[0].name}s/profile` 
    }
  }

  onStarClick(indx) {
    this.starRating.forEach((rating, index) => {
      if (indx >= index)
      rating._elementRef.nativeElement.innerHTML = "star";
      else
      rating._elementRef.nativeElement.innerHTML = "star_border";
    });
    this.rating = indx + 1;
  }

  onSubmit() {
    this.loading = true;
    const ratingData = this.prepareSave();
    this.publisherService.addRating(ratingData).subscribe(() => {
      this.textReview.nativeElement.value = '';
      this.rating = 0;
      this.starRating.forEach(rating => {
        rating._elementRef.nativeElement.innerHTML = "star_border";
      });
      this.sharedService.openSnackBar('Rated Successfully', null, {duration: 2000});
      this.loading= false;
    }, (error => {
      this.sharedService.openSnackBar('An error occured', null, {duration: 2000});
    }));
  }

  private prepareSave(){
    let form = new FormData();
    form.append('rating', `${this.rating}`);
    form.append('review', this.textReview.nativeElement.value);
    form.append('publisherID', `${this.id}`);
    form.append('authorID', this.currentUser.id);
    return form;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
