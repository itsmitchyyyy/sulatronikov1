import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
}
