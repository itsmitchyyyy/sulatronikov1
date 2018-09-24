import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  deleteManuscript(id): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/deleteManuscript', { params: { id: id } })
      .pipe(
        catchError(val => of(val))
      );
  }
}
