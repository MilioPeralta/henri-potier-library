import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Book} from "../../classes/book";

@Injectable()
export class BooksService {

  private booksUrl: string = "http://henri-potier.xebia.fr/books";
  private filterText: string = "";
  private books: Book[] = [];

  constructor(private http: Http) {
    this.http.get(this.booksUrl)
      .map(res => res.json() || [])
      .subscribe(res => this.books = res);
  }

  /**
   * Fetch the book list
   * @returns {R}
   */
  getBooks() {
    return this.books.filter(book => book.title.toLowerCase().indexOf(this.filterText) > -1);
  }

  setFilterText(value) {
    if (typeof value !== 'undefined') {
      this.filterText = value.toLowerCase();
    }
  }

}
