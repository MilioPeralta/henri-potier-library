import {Component, OnInit} from "@angular/core";
import {BooksService} from "../../services/books/books.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {


  constructor(public booksService: BooksService) {
  }

  ngOnInit() {
  }

  setFilterText(value) {
    this.booksService.setFilterText(value);
  }

}
