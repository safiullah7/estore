import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faHeart, faSearch, faShoppingCart, faUser, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {CategoriesStoreItem} from '../../services/category/categories.storeItem';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductsStoreItem} from '../../services/product/products.storeItem';
import {filter, Subscription} from 'rxjs';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {CartStoreItem} from '../../services/cart/cart.storeItem';
import {UserService} from '../../services/users/user.service';
import {LoggedInUser} from '../../../../types/user.type';

@Component({
  selector: 'app-header',
  imports: [
    FaIconComponent,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  @Output()
  onUserSearched: EventEmitter<string> = new EventEmitter<string>();

  protected readonly faSearch = faSearch;
  protected readonly faUserCircle = faUserCircle;
  protected readonly faHeart = faHeart;
  protected readonly faShoppingCart = faShoppingCart;
  searchText: string = '';
  categoryId: number = 1;
  displayNavItems: boolean = false;
  subscriptions: Subscription = new Subscription();
  isUserAuthenticated: boolean = false;
  userName: string = '';
  protected readonly faUser = faUser;

  constructor(
    public categoryStore: CategoriesStoreItem,
    private router: Router,
    public cartStore: CartStoreItem,
    public userService: UserService,
  ) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.displayNavItems = event.url === '/home/products';
    })

    this.subscriptions.add(this.userService.isUserAuthenticated$.subscribe(result => {
      this.isUserAuthenticated = result;
    }))

    this.subscriptions.add(this.userService.loggedInUser$.subscribe(user => {
      this.userName = user.firstName + ' ' + user.lastName;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  searchProducts() {
    let query = `mainCategoryId=${this.categoryId}&keyword=${this.searchText}`;
    this.onUserSearched.emit(query);
  }
  navigateToCart() {
    this.router.navigate(['home/cart']);
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/home/products']);
  }

  pastOrders() {
    this.router.navigate(['home/pastorders']);
  }
}
