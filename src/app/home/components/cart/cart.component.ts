import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {CartStoreItem} from '../../services/cart/cart.storeItem';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {RatingsComponent} from '../../../shared/components/ratings/ratings.component';
import {AsyncPipe, CommonModule} from '@angular/common';
import {CartItem} from '../../../../types/cart.type';

@Component({
  selector: 'app-cart',
  imports: [
    FaIconComponent,
    RatingsComponent,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  protected readonly faTrash = faTrash;
  constructor(private router: Router, public cartStore: CartStoreItem) {
  }
  navigateToHome() {
    this.router.navigate(['home/products']);
  }
  removeItem(cartItem: CartItem) {
    this.cartStore.removeProduct(cartItem);
  }
  updateQuantity($event: any, cartItem: CartItem) {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }
}
