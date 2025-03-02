import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {CategoryService} from './home/services/category/category.service';
import {CategoriesStoreItem} from './home/services/category/categories.storeItem';
import {ProductsService} from './home/services/product/products.service';
import {ProductsStoreItem} from './home/services/product/products.storeItem';
import {CartStoreItem} from './home/services/cart/cart.storeItem';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    [CategoryService, CategoriesStoreItem],
    [ProductsService, ProductsStoreItem],
    [CartStoreItem],
    provideRouter(routes)
  ]
};
