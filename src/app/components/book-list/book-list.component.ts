import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../services/books/books.service";
import {Book} from "../../classes/book";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BooksService]
})
export class BookListComponent implements OnInit {
  private books: Observable<Book[]>;

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.getBooks()
  }

  getBooks() {
    this.books = this.booksService.getBooks();
  }

}
