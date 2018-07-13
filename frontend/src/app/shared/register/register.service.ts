import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(account: any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/user/register', account)
      .pipe(map((res: any) => {
        if (res && res.token) {
          sessionStorage.setItem('currentUser', JSON.stringify({ token: res.token }));
        }
      }));
  }

}
