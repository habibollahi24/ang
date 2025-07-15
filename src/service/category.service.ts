import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface CategoryType {
  slug: string;
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseUrl = 'https://dummyjson.com/products/categories';
  private http = inject(HttpClient);

  getCategories() {
    return this.http.get<CategoryType[]>(this.baseUrl);
  }
}
