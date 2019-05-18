import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  constructor(private http: HttpClient) { }

  addBook(manuscript: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/addManuscript', manuscript)
      .pipe(
        catchError(val => of(val))
      );
  }

  allPublishers(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/allPublisher')
      .pipe(
        catchError(val => of(val))
      )
  }

  search(term: Observable<any>) {
    return term.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(terms => this.searchUser(terms))
    );
  }

  searchUser(term: string) {
    return this.http.get<any>('http://127.0.0.1:8000/api/search', { params: { search: term } })
      .pipe(
        catchError(val => of(val))
      );
  }

  addRating(rating: any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/rating/add', rating)
      .pipe(
        catchError(val => of(val))
      );
  }
}
