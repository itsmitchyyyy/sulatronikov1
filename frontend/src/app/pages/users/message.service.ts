import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  addMessage(message: any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/addMessage', message)
      .pipe(
        catchError(val => of(val))
      );
  }

  replyMessage(message: any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/replyMessage', message)
      .pipe(
        catchError(val => of(val))
      );
  }

  getReplies(id: any): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/getReplies', { params: { id: id } })
      .pipe(
        catchError(val => of(val))
      );
  }

  getMessages(id: any) {
    return this.http.get<any>('http://127.0.0.1:8000/api/getMessage', { params: { id: id } })
      .pipe(
        catchError(val => of(val))
      );
  }

  getMessage(id: any) {
    return this.http.get<any>('http://127.0.0.1:8000/api/messageConversation', { params: { id: id } })
      .pipe(
        catchError(val => of(val))
      );
  }
}
