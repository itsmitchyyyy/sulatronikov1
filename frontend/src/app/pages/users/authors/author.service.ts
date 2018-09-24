import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  allAuthor(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/allAuthor')
      .pipe(
        catchError(val => of(val))
      );
  }
}
