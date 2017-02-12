import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {BookComponent} from './components/book/book.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {BasketComponent} from './components/basket/basket.component';
import {MaterialModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
