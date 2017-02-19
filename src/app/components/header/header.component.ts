import {Component} from "@angular/core";
import {BasketService} from "../../services/basket/basket.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public basketService: BasketService) {
  }
}
