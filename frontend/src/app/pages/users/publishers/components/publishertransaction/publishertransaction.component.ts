import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PublisherService } from '../../publisher.service';
import { GenreService } from '../../../genre.service';
import { UserService } from '../../../user.service';
import { SharedService } from '../../../../../shared/shared.service';

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
    genres: any;
    isSearch: boolean;
    searchAuthor$ = new Subject<string>();
    authors: any;
    authorID: any;
    imgSrc: any;
    copyWriter: any;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private publisherService: PublisherService,
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
            'photo': null,
            'title': null,
            'sypnosis': null,
            'author': null,
            'genreID': null
        });
        this.allCopyPub();
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

    submitBook() {
        const bookData = this.prepareSave();
        this.loading = true;
        this.publisherService.addBook(bookData).subscribe(() => {
            this.loading = false;
            this.sharedService.openSnackBar('Book Submitted', null, { duration: 2000 })
            this.imgSrc = null;
            this.form.reset();
            window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
        });
    }

    allCopyPub() {
        this.subscription.set('copyPubSub', this.userService
            .allCopyPub(this.id)
            .subscribe(res => {
                this.copyWriter = res;
            }))
    }

    private prepareSave() {
        let input = new FormData();
        input.append('photo', this.photo, this.photo.name);
        input.append('title', this.form.get('title').value);
        input.append('sypnosis', this.form.get('sypnosis').value);
        input.append('authorID', this.authorID);
        input.append('publisherID', `${this.id}`);
        input.append('genreID', this.form.get('genreID').value);
        input.append('role', 'writer');
        return input;
    }

    ngOnDestroy() {
        this.subscription.forEach(sub => sub.unsubscribe());
    }

}
