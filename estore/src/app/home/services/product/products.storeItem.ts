import {Injectable} from '@angular/core';
import {StoreItem} from '../../../shared/storeItem';
import {Product} from '../../../../types/product.type';
import {ProductsService} from './products.service';
import {Observable} from 'rxjs';

@Injectable()
export class ProductsStoreItem extends StoreItem<Product[]> {
  constructor(private productService: ProductsService) {
    super([]);
  }
  async loadProducts(query?: string) {
    this.productService.getAllProducts(query).subscribe((products: Product[]) => {
      this.setValue(products);
    })
  }
  get products$(): Observable<Product[]> {
    return this.value$;
  }
  get products() {
    return this.value;
  }
}
