import { Component } from '@angular/core';
import {ProductsComponent} from '../products/products.component';
import {SidenavigationComponent} from '../../sidenavigation/sidenavigation.component';
import {ProductsStoreItem} from '../../services/product/products.storeItem';

@Component({
  selector: 'app-products-gallery',
  imports: [
    ProductsComponent,
    SidenavigationComponent
  ],
  templateUrl: './products-gallery.component.html',
  styleUrl: './products-gallery.component.scss'
})
export class ProductsGalleryComponent {
  constructor(private productsStore: ProductsStoreItem) {
  }
  subCategorySelected(subcategoryId: number) {
    this.productsStore.loadProducts('subcategoryId=' + subcategoryId);
  }
}
