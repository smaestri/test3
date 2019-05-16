import { Component, OnInit } from '@angular/core';
import { Bookservice } from '../shared/bookservice.service';
import { BookModel } from '../shared/bookmodel';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.scss']
})
export class MybooksComponent implements OnInit {
  mybooks: BookModel[];

  constructor(private bookService : Bookservice) { }

  ngOnInit() {
    this.bookService.getMyBooks().subscribe((data: BookModel[]) => {
      this.mybooks = data;
    });

  }

}
