import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CopywriterService {

  constructor(private http: HttpClient) { }

  assignCopyWriter(data): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/assignCopyWriter', data).
    pipe(
      catchError(val => of(val))
    )
  }
}
