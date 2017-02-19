import {Component} from "@angular/core";
import {BooksService} from "../../services/books/books.service";
import {Book} from "../../classes/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BooksService]
})
export class BookListComponent {
  private books: Book[];

  constructor(private booksService: BooksService) {
  }

}
