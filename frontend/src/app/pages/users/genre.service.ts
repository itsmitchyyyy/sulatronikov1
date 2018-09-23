import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GenreService {

    constructor(private http: HttpClient) { }

    allGenre(): Observable<any> {
        return this.http.get<any>('http://127.0.0.1:8000/api/allGenre')
            .pipe(
                catchError(val => of(val))
            );
    }

    findGenre(id: any): Observable<any> {
        return this.http.get<any>('http://127.0.0.1:8000/api/findGenre', { params: { id: id } })
            .pipe(
                catchError(val => of(val))
            );
    }
}
