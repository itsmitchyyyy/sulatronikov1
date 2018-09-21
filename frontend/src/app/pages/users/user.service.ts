import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }
  getUser(userId: any): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/getUser', { params: { id: userId } })
      .pipe(
        catchError((val => of(val)))
      );
  }

  updateUser(user: any): Observable<any> {

    return this.http.post<any>('http://127.0.0.1:8000/api/updateUser', user, this.httpOptions)
      .pipe(
        catchError((val => of(val)))
      );
  }

  updatePassword(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/updatePassword', data, this.httpOptions)
      .pipe(
        catchError((val => of(val)))
      );
  }
}