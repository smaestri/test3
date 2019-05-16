import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  logout(): any {
    return this.http.post('/logout', null);
  }

  saveUser(user: any): any {
    return this.http.post('/users', user);
  }
  login(user: any): any {
    var bodyFormData = new FormData();
    bodyFormData.set('username', user.email);
    bodyFormData.set('password', user.password);
    return this.http.post('/login', bodyFormData);
  }

  isAuthenticated(): any {
    return this.http.get('/isAuthenticated');
  }

  
}
