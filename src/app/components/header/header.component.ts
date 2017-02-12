import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../services/basket/basket.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [BasketService]
})
export class HeaderComponent implements OnInit {

  constructor(private basketService: BasketService) {
  }

  ngOnInit() {
  }

}
