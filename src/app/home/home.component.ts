import { Component } from '@angular/core';
import {CatnavigationComponent} from './components/catnavigation/catnavigation.component';
import {HeaderComponent} from './components/header/header.component';
import {SidenavigationComponent} from './sidenavigation/sidenavigation.component';
import {ProductsComponent} from './components/products/products.component';
import {CategoriesStoreItem} from './services/category/categories.storeItem';
import {ProductsStoreItem} from './services/product/products.storeItem';
import {ProductsGalleryComponent} from './components/products-gallery/products-gallery.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CatnavigationComponent,
    HeaderComponent,
    SidenavigationComponent,
    ProductsComponent,
    ProductsGalleryComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private categoriesStoreItem: CategoriesStoreItem,
    private productsStoreItem: ProductsStoreItem,
  ) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
  }
  mainCategorySelected(mainCategoryId: number) {
    this.productsStoreItem.loadProducts('mainCategoryId=' + mainCategoryId);
  }
  userSearched(query: string) {
    this.productsStoreItem.loadProducts(query);
  }
}
