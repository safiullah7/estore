import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesStoreItem} from '../../services/category/categories.storeItem';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-catnavigation',
  imports: [CommonModule],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss'
})
export class CatnavigationComponent {
  @Output()
  mainCategorySelected: EventEmitter<number> = new EventEmitter<number>();
  displayNavItems: boolean = false;
  constructor(public categoryStore: CategoriesStoreItem, private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.displayNavItems = event.url === '/home/products';
    })
  }
  onMainCategorySelected(subcategoryId: number) {
    this.mainCategorySelected.emit(subcategoryId);
  }
}
