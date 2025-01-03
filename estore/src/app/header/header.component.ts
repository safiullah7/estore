import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faHeart, faSearch, faShoppingCart, faUserCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [
    FaIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly faSearch = faSearch;
  protected readonly faUserCircle = faUserCircle;
  protected readonly faHeart = faHeart;
  protected readonly faShoppingCart = faShoppingCart;
}
