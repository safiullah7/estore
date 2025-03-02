import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { Subscription } from 'rxjs';
import {Product} from '../../../../types/product.type';
import {CurrencyPipe, NgIf} from '@angular/common';
import {RatingsComponent} from '../../../shared/components/ratings/ratings.component';
import {CartStoreItem} from '../../services/cart/cart.storeItem';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
  imports: [
    CurrencyPipe,
    RatingsComponent,
    NgIf,
    FaIconComponent
  ]
})
export class ProductdetailsComponent implements OnInit, OnDestroy {
  product: Product;
  subscriptions: Subscription = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cart: CartStoreItem
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe((product) => {
        this.product = product[0];
      })
    );
  }
  addToCart(): void {
      this.cart.addProduct(this.product);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected readonly faShoppingCart = faShoppingCart;
}
