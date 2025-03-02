import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Category} from '../../../types/category.type';
import {CategoryService} from '../services/category/category.service';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';
import {CategoriesStoreItem} from '../services/category/categories.storeItem';

@Component({
  selector: 'app-sidenavigation',
  imports: [CommonModule],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss'
})
export class SidenavigationComponent implements OnDestroy {
  @Output()
  subCategorySelectedCallback: EventEmitter<number> = new EventEmitter<number>();

  categories: Category[] = [];
  subscriptions: Subscription = new Subscription();
  constructor(categoryStore: CategoriesStoreItem) {
    this.subscriptions.add(
      categoryStore.categories$.subscribe(categories => this.categories = categories)
    );
  }
  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter(cat =>
      parentCategoryId ?
        cat.parent_category_id === parentCategoryId :
        cat.parent_category_id === null
    );
  }
  onSubcategoryClicked(subCategoryId: number) {
    this.subCategorySelectedCallback.emit(subCategoryId);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
