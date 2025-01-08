import { Injectable } from '@angular/core';
import {categories} from '../../../sample-data/categories.data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor() { }

  getAllCategories() {
    return categories;
  }
}
