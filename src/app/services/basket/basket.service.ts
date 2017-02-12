import {Injectable} from '@angular/core';
import {Book} from "../../classes/book";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

@Injectable()
export class BasketService {

  public books: Book[] = [];
  private snackBarConfig: MdSnackBarConfig = {duration: 3000};

  constructor(public snackBar: MdSnackBar) {
  }

  add(book: Book) {
    this.books.push(book);
    let snackBarRef = this.snackBar.open('Added to basket', 'Undo', this.snackBarConfig);

    snackBarRef.onAction().subscribe(() => {
      this.remove(this.books.length - 1);
    });

    console.log('this.books', this.books)
    console.log('count', this.count())
  }

  remove(index: number) {
    this.books = [
      ...this.books.slice(0, index),
      ...this.books.slice(index + 1, this.books.length)
    ]
  }

  count() {
    console.log('count', this.books)
    return this.books.length;
  }

}
