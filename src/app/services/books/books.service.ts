import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Book} from "../../classes/book";

@Injectable()
export class BooksService {

  private booksUrl: string = "http://henri-potier.xebia.fr/books";

  constructor(private http: Http) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get(this.booksUrl)
      .map(res => res.json() || [])
  }

}
