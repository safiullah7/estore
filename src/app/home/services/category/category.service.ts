import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../../../types/category.type';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) { }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:5011/productcategories');
  }
}
