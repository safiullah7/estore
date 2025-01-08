import { Component } from '@angular/core';
import {Category} from '../../../types/category.type';
import {CategoryService} from '../services/category.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sidenavigation',
  imports: [CommonModule],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss'
})
export class SidenavigationComponent {
  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {
    this.categories = categoryService.getAllCategories();
  }
  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter(cat => cat.parent_category_id === parentCategoryId);
  }
}
