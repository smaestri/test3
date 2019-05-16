import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {



  constructor(private http: HttpClient ) { }

  getMyLoans(): any {
    return this.http.get("/users/" + sessionStorage.getItem('userId') +"/loans");
  }

  closeLoan(idLoan: number): any {
    return this.http.delete("/loans/" + idLoan);
  }

  loanBook(idBook: number): any {
    return this.http.post("/users/" +  sessionStorage.getItem('userId') + "/loans/" + idBook, null);
  }

}
