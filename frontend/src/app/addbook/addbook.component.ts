import { Component, OnInit } from '@angular/core';
import { Bookservice } from '../shared/bookservice.service';
import { BookModel } from '../shared/bookmodel';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {
  
  book: BookModel = {
    name: '',
    category: ''
  };

  constructor(private bookService : Bookservice, private router: Router, public modal: MatDialog) { }

  ngOnInit() {
  }


  save() {
    this.bookService.saveBook(this.book).subscribe(() => {
      this.router.navigate(['/home/my-books']);
    }, (response) => {
      if (response && response.error) {
        this.modal.open(ModalComponent, {
          data: {
            errors: response.error.errors,
            title: "Erreurs"
          }
        });
      }
    })
  }

}
