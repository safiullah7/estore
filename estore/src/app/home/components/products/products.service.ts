import { Injectable } from '@angular/core';
import {Product} from '../../../../types/product.type';
import {products} from './products.data';

@Injectable()
export class ProductsService {

  constructor() { }

  getAllProducts(): Product[] {
    return products;
  }
}
