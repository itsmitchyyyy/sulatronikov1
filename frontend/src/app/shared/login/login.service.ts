import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public readonly authenticated = this._isAuthenticated.asObservable();
  constructor(private http: HttpClient) { }

  login(credentials: Credentials) {
    return this.http.post<any>('http://127.0.0.1:8000/api/user/login', credentials)
      .pipe(map((res: any) => {
        if (res && res.token) {
          sessionStorage.setItem('currentUser', JSON.stringify({ token: res.token }));
        }
      }));
  }

  logout() {
    const data = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.get<any>('http://127.0.0.1:8000/api/logout', { params: { token: data.token } });
  }

  getLoggedIn() {
    const data = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.get<any>('http://127.0.0.1:8000/api/user', { params: { token: data.token } })
  }

  isAuthenticated(event) {
    localStorage.setItem('storedPop', event);
    this._isAuthenticated.next(event);
  }
}
