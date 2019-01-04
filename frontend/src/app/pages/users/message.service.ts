import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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

  getMessages(id: any) {
    return this.http.get<any>('http://127.0.0.1:8000/api/getMessage', { params: { id: id } })
      .pipe(
        catchError(val => of(val))
      );
  }

  getMessage(param: any) {
    return this.http.get<any>('http://127.0.0.1:8000/api/messageConversation', { params: param })
      .pipe(
        catchError(val => of(val))
      );
  }

  searchPublisher(term: Observable<any>){
    return term.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(res => this.searchPublisher(res)));
  }

  search(term: string){
    return this.http.get('http://127.0.0.1:8000/api/searchPublisher', { params: { search: term }})
      .pipe(
        catchError(val => of(val))
      );
  }
}
