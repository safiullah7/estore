import { Component } from '@angular/core';
import {ProductsService} from './products.service';
import {Product} from '../../../../types/product.type';
import {CommonModule} from '@angular/common';
import {RatingsComponent} from '../../../shared/components/ratings/ratings.component';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RatingsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsService]
})
export class ProductsComponent {
  products: Product[] = [];
  constructor(private productsService: ProductsService) {
    this.products = productsService.getAllProducts();
  }
}
