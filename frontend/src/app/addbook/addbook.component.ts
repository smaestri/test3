import { Component, OnInit } from '@angular/core';
import { Bookservice } from '../shared/bookservice.service';
import { BookModel } from '../shared/bookmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {
  
  private book: BookModel = {
    name: '',
    category: ''
  };

  constructor(private bookService : Bookservice, private router: Router) { }

  ngOnInit() {
  }


  save() {
    this.bookService.saveBook(this.book).subscribe(() => {
      this.router.navigate(['']);
    }, (response) => {
      if (response && response.error) {
        alert('erreur detectee')
      }
    })
  }

}
