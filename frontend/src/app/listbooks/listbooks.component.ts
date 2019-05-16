import { Component, OnInit } from '@angular/core';
import { BookModel } from '../shared/bookmodel';
import { Bookservice } from '../shared/bookservice.service';
import { LoanService } from '../loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listbooks',
  templateUrl: './listbooks.component.html',
  styleUrls: ['./listbooks.component.scss']
})
export class ListbooksComponent implements OnInit {
  books: BookModel[] = [];

  constructor(private bookService : Bookservice,
     private loanService : LoanService,
     private router : Router) { }

  ngOnInit() {

    this.books = [];
    this.bookService.getBooksAvailable().subscribe((data: BookModel[]) => {
      this.books = data;
    }, () => {
      alert('error detected')
    });

  }

  loanBook(idBook: number) {
    this.loanService.loanBook(idBook).subscribe(() => {
      this.router.navigate(['/my-loans']);
    })
  }

}
