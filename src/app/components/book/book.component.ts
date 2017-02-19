import {Component, Input} from "@angular/core";
import {Book} from "../../classes/book";
import {BasketService} from "../../services/basket/basket.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  @Input()
  book: Book;

  /**
   * Flag to hide/show the synopsis of a given book
   * @type {boolean}
   */
  public synopsisVisible: boolean = false;

  constructor(private basketService: BasketService) {
  }

  addToShoppingCart() {
    this.basketService.add(this.book);
  }

  showSynopsis() {
    this.synopsisVisible = true;
  }

  hideSynopsis() {
    this.synopsisVisible = false;
  }

}
