import {Component, OnInit, Input} from '@angular/core';
import {Book} from "../../classes/book";
import {BasketService} from "../../services/basket/basket.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BasketService]
})
export class BookComponent implements OnInit {

  @Input()
  book: Book;

  ngOnInit() {
  }

  constructor(private basketService: BasketService) {
  }

  addToShoppingCart() {
    this.basketService.add(this.book);
  }

}
