import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: Credentials){
    return this.http.post<any>('http://127.0.0.1:8000/api/user/login', credentials)
    .pipe(map((res: any) => {
      if(res && res.token){
        localStorage.setItem('currentUser', JSON.stringify({ username: credentials.username, token: res.token}));
      }
    }))
  }
}
