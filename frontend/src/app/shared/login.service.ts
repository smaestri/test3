import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor() { }

  logout(): any {
    throw new Error("Method not implemented.");
  }
}
