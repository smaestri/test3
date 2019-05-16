import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookModel } from '../shared/bookmodel';
import { Bookservice } from '../shared/bookservice.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book: BookModel;
  @Input() editMode: Boolean;
  @Output() refreshBooks = new EventEmitter<boolean>();

  constructor(private bookService : Bookservice) { }

  ngOnInit() {
  }

  deleteBook(idBook: number) {
    this.bookService.deleteBook(idBook).subscribe(() => {
      this.refreshBooks.emit();
    }, (response) => {
      if (response && response.status === 409) {
        alert('erreur livre en cours d\'emprunt')
      }
    })
  }

}
