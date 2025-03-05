import { Component } from '@angular/core';
import {CatnavigationComponent} from './components/catnavigation/catnavigation.component';
import {HeaderComponent} from './components/header/header.component';
import {SidenavigationComponent} from './sidenavigation/sidenavigation.component';
import {ProductsComponent} from './components/products/products.component';
import {CategoriesStoreItem} from './services/category/categories.storeItem';
import {ProductsStoreItem} from './services/product/products.storeItem';
import {ProductsGalleryComponent} from './components/products-gallery/products-gallery.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CatnavigationComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private categoriesStoreItem: CategoriesStoreItem,
    private productsStoreItem: ProductsStoreItem,
    private router: Router
  ) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      if (event.url === '/home') {
        router.navigate(['/home/products']);
      }
    })
  }
  mainCategorySelected(mainCategoryId: number) {
    this.productsStoreItem.loadProducts('mainCategoryId=' + mainCategoryId);
  }
  userSearched(query: string) {
    this.productsStoreItem.loadProducts(query);
  }
}
