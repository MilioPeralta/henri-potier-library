import {Injectable} from "@angular/core";
import {Book} from "../../classes/book";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Http} from "@angular/http";

@Injectable()
export class BasketService {

  public books: Book[] = [];

  private snackBarConfig: MdSnackBarConfig = {duration: 3000};
  private basketsUrlPrefix: string = "http://henri-potier.xebia.fr/books/";
  private basketsUrlSuffix: string = "/commercialOffers";
  private commercialOffers: any;
  private PERCENTAGE_TYPE: string = "percentage";
  private MINUS_TYPE: string = "minus";
  private SLICE_TYPE: string = "slice";

  constructor(public snackBar: MdSnackBar, private http: Http) {
    this.commercialOffers = this.getCommercialOffers();
  }

  getCommercialOffers(): any {
    if (this.count() > 0) {
      this.http.get(this.basketsUrlPrefix + this.getIsbns() + this.basketsUrlSuffix)
        .map(res => {
          this.commercialOffers = res.json() || [];
          return this.commercialOffers;
        })
        .subscribe();
    }
  }

  add(book: Book) {
    let index = this.find(book.isbn)
    if (index === null) {
      book.quantity = 1;
      this.books.push(book);
    } else {
      this.books[index].quantity++;
    }
    let snackBarRef = this.snackBar.open('Added to basket', 'Undo', this.snackBarConfig);

    snackBarRef.onAction().subscribe(() => {
      this.remove(this.books.length - 1);
    });

    this.commercialOffers = this.getCommercialOffers();
  }

  remove(index: number) {
    this.books = [
      ...this.books.slice(0, index),
      ...this.books.slice(index + 1, this.books.length)
    ]

    this.commercialOffers = this.getCommercialOffers();
  }

  count() {
    return this.books.length;
  }

  get() {
    return this.books;
  }

  getTotal(): number {
    return this.books.reduce((acc, book) => acc + book.quantity * book.price, 0);
  }

  getTotalWithOffers() {
    const total = this.getTotal();

    let totalWithOffers: number = 0;

    if (this.commercialOffers) {
      this.commercialOffers.offers.forEach(offer => {
        if (offer.type === this.PERCENTAGE_TYPE) {
          const totalPercentage = this.getPercentageTotal(offer.value, total);
          console.log('totalPercentage', totalPercentage);
          totalWithOffers = totalPercentage;
        }
        else if (offer.type === this.MINUS_TYPE) {
          const totalMinus = this.getMinusTotal(offer.value, total);
          console.log('totalMinus', totalMinus);
          totalWithOffers = totalMinus < totalWithOffers ? totalMinus : totalWithOffers;
        }
        else if (offer.type === this.SLICE_TYPE) {
          const totalSlice = this.getSliceTotal(offer.value, offer.sliceValue, total);
          console.log('totalSlice', totalSlice);
          totalWithOffers = totalSlice < totalWithOffers ? totalSlice : totalWithOffers;
        }
      });
    }

    return totalWithOffers;
  }

  getPercentageTotal(percentage: number, total: number) {
    return total - (total * percentage) / 100;
  }

  getMinusTotal(minus: number, total: number) {
    return total - minus;
  }

  getSliceTotal(minus: number, sliceValue: number, total: number) {
    const numberOfSlices = Math.floor(total / sliceValue);
    return total - (numberOfSlices * minus);
  }

  getIsbns() {
    return this.books.reduce((acc, book) => acc + ',' + book.isbn, '');
  }

  find(isbn: string) {
    let index = null;
    this.books.some((book, i) => {
      let found = book.isbn === isbn
      if (found) {
        index = i;
      }
      return found;
    })

    return index;
  }

}
