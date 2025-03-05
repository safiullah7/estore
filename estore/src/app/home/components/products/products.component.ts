import { Component } from '@angular/core';
import {ProductsService} from '../../services/product/products.service';
import {Product} from '../../../../types/product.type';
import {CommonModule} from '@angular/common';
import {RatingsComponent} from '../../../shared/components/ratings/ratings.component';
import {ProductsStoreItem} from '../../services/product/products.storeItem';
import {RouterLink} from '@angular/router';
import {CartStoreItem} from '../../services/cart/cart.storeItem';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RatingsComponent, RouterLink, FaIconComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsService]
})
export class ProductsComponent {
  constructor(
    public productsStore: ProductsStoreItem,
    private cart: CartStoreItem,
  ) {}
  addToCart(product: Product): void {
    this.cart.addProduct(product);
  }

  protected readonly faShoppingCart = faShoppingCart;
}
