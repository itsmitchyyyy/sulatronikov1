import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManuscriptService {

  constructor(private http: HttpClient) { }

  getManuscript(manuscriptID: any): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/getManuscript', { params: { id: manuscriptID } })
      .pipe(
        catchError(val => of(val))
      );
  }

  getPublishedManuscript(manuscriptID: any): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/publishedGet', { params: { id: manuscriptID } })
      .pipe(
        catchError(val => of(val))
      );
  }

  editManuscript(id: any): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/editManuscript', { params: { id: id } })
      .pipe(
        catchError(val => of(val))
      )
  }

  updateManuscript(manuscript): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/updateManuscript', manuscript)
      .pipe(
        catchError(val => of(val))
      );
  }

  authorManuscript(id): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/authorManuscript', { params: { id: id } })
      .pipe(
        catchError(val => of(val))
      );
  }

  authorPublishedManuscript(id): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/authorManuscriptPublished', { params: { id: id } })
      .pipe(
        catchError(val => of(val))
      );
  }


  deleteManuscript(id): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/deleteManuscript', { params: { id: id } })
      .pipe(
        catchError(val => of(val))
      );
  }

  sortManuscript(sort, id){
    return this.http.get<any>('http://127.0.0.1:8000/api/sortManuscript', { params: { id: id, sort: sort } })
      .pipe(
        catchError(val => of(val))
      );
  }

  sortManuscriptGenre(sort, id){
    return this.http.get<any>('http://127.0.0.1:8000/api/sortManuscriptGenre', { params: { id: id, sort: sort } })
      .pipe(
        catchError(val => of(val))
      );
  }


  search(terms: Observable<any>, id) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchManuscript(term, id)));
  }

  searchManuscript(sort, id){
    return this.http.get<any>('http://127.0.0.1:8000/api/searchManuscript', { params: { id: id, sort: sort } })
      .pipe(
        catchError(val => of(val))
      );
  }


  sortAuthManuscript(sort, id){
    return this.http.get<any>('http://127.0.0.1:8000/api/sortAuthManuscript', { params: { id: id, sort: sort } })
      .pipe(
        catchError(val => of(val))
      );
  }

  sorAuthManuscriptGenre(sort, id){
    return this.http.get<any>('http://127.0.0.1:8000/api/sortAuthManuscriptGenre', { params: { id: id, sort: sort } })
      .pipe(
        catchError(val => of(val))
      );
  }


  searchAuth(terms: Observable<any>, id) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchAuthManuscript(term, id)));
  }

  searchAuthManuscript(sort, id){
    return this.http.get<any>('http://127.0.0.1:8000/api/searchAuthManuscript', { params: { id: id, sort: sort } })
      .pipe(
        catchError(val => of(val))
      );
  }
}
