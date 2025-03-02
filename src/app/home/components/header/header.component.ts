import {Component, EventEmitter, Output} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faHeart, faSearch, faShoppingCart, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {CategoriesStoreItem} from '../../services/category/categories.storeItem';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductsStoreItem} from '../../services/product/products.storeItem';
import {filter} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {CartStoreItem} from '../../services/cart/cart.storeItem';

@Component({
  selector: 'app-header',
  imports: [
    FaIconComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output()
  onUserSearched: EventEmitter<string> = new EventEmitter<string>();

  protected readonly faSearch = faSearch;
  protected readonly faUserCircle = faUserCircle;
  protected readonly faHeart = faHeart;
  protected readonly faShoppingCart = faShoppingCart;
  searchText: string = '';
  categoryId: number = 1;
  displayNavItems: boolean = false;
  constructor(
    public categoryStore: CategoriesStoreItem,
    private router: Router,
    public cartStore: CartStoreItem
  ) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.displayNavItems = event.url === '/home/products';
    })
  }
  searchProducts() {
    let query = `mainCategoryId=${this.categoryId}&keyword=${this.searchText}`;
    this.onUserSearched.emit(query);
  }
  navigateToCart() {
    this.router.navigate(['home/cart']);
  }
}
