import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService : LoginService) { }

  canActivate(): Observable<boolean> {
    return this.loginService.isAuthenticated().pipe(map((userId: string) => {
      // if user authenticated, save ID in storage
      if (userId !== '0') {
        sessionStorage.setItem('userId', userId);
        return true
      }
      return false;
    }));
  }
  
}
