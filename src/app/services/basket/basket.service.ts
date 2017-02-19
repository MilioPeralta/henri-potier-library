import {Injectable} from "@angular/core";
import {Book} from "../../classes/book";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Http} from "@angular/http";

@Injectable()
export class BasketService {

  /**
   * Contains the book list composing the basket
   * @type {Array}
   */
  public books: Book[] = [];

  /**
   * Durantion after which the snackbar disapears
   * @type {{duration: number}}
   */
  private snackBarConfig: MdSnackBarConfig = {duration: 3000};

  /**
   * Urls used to get the commercials offers for a given list of isbns
   * @type {string}
   */
  private basketsUrlPrefix: string = "http://henri-potier.xebia.fr/books/";
  private basketsUrlSuffix: string = "/commercialOffers";
  private commercialOffers: any;

  /**
   * Types of commercials offers
   * @type {string}
   */
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

  /**
   * Add a book and offers the possibility to undo the action through the display of a snackbar
   * Commercial offers are also being fetched
   * @param book
   */
  add(book: Book) {
    let index = this.find(book.isbn);
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

  /**
   * Deletes the given book with ghe given isbn from the basket
   * @param isbn
   */
  delete(isbn: string) {
    const index = this.find(isbn);
    if (index !== null) {
      this.remove(index);
    }
  }

  /**
   * Removes the book at the given index
   * @param index
   */
  remove(index: number) {
    this.books = [
      ...this.books.slice(0, index),
      ...this.books.slice(index + 1, this.books.length)
    ];

    this.commercialOffers = this.getCommercialOffers();
  }

  count() {
    return this.books.length;
  }

  get() {
    return this.books;
  }

  /**
   * Returns the total without discount
   * @returns {number}
   */
  getTotal(): number {
    return this.books.reduce((acc, book) => acc + book.quantity * book.price, 0);
  }

  /**
   * Return the total with discounts
   * @returns {number}
   */
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

  /**
   * Returns the total with a percentage discount
   * @param percentage
   * @param total
   * @returns {number}
   */
  getPercentageTotal(percentage: number, total: number) {
    return total - (total * percentage) / 100;
  }

  /**
   * Returns the total with a minus discount
   * @param minus
   * @param total
   * @returns {number}
   */
  getMinusTotal(minus: number, total: number) {
    return total - minus;
  }

  /**
   * Returns the total with a slice discount
   * @param minus
   * @param sliceValue
   * @param total
   * @returns {number}
   */
  getSliceTotal(minus: number, sliceValue: number, total: number) {
    const numberOfSlices = Math.floor(total / sliceValue);
    return total - (numberOfSlices * minus);
  }

  /**
   * Returns isbn list separated with a comma for the http call
   * @returns {string}
   */
  getIsbns() {
    return this.books.reduce((acc, book) => acc + ',' + book.isbn, '');
  }

  /**
   * Returns the index of the book with the given isbn in the basket
   * @param isbn
   * @returns {null}
   */
  find(isbn: string) {
    let index = null;
    this.books.some((book, i) => {
      let found = book.isbn === isbn;
      if (found) {
        index = i;
      }
      return found;
    });

    return index;
  }

}
