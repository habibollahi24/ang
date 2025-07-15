import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly products = signal<ProductType[]>([]);
  readonly isLoading = signal(false);
  readonly total = signal(0);

  constructor() {
    effect(() => {
      this.route.queryParamMap.subscribe((params) => {
        const category = params.get('category');
        const search = params.get('q');
        const limit = +(params.get('limit') ?? 9);
        const skip = +(params.get('skip') ?? 0);

        this.isLoading.set(true);

        let url = 'https://dummyjson.com/products';

        if (search) {
          url = `https://dummyjson.com/products/search?q=${search}`;
        } else if (category) {
          url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
        } else {
          url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        }

        this.http
          .get<{ products: ProductType[]; total: number }>(url)
          .subscribe((res) => {
            this.products.set(res.products);
            this.total.set(res.total);
            this.isLoading.set(false);
          });
      });
    });
  }

  // constructor() {
  //   effect(() => {
  //     this.route.queryParamMap.subscribe((params) => {
  //       const category = params.get('category');
  //       const search = params.get('q');
  //       const limit = +(params.get('limit') ?? 9);
  //       const skip = +(params.get('skip') ?? 0);

  //       this.isLoading.set(true);

  //       let url = 'https://dummyjson.com/products';
  //       if (search) {
  //         url = `https://dummyjson.com/products/search?q=${search}`;
  //       } else if (category) {
  //         url = `https://dummyjson.com/products/category/${category}`;
  //       }

  //       const hasPagination = !search && !category;
  //       if (hasPagination) {
  //         url += `?limit=${limit}&skip=${skip}`;
  //       }

  //       this.http
  //         .get<{ products: ProductType[]; total: number }>(url)
  //         .subscribe((res) => {
  //           this.products.set(res.products);
  //           this.total.set(res.total);
  //           this.isLoading.set(false);
  //         });
  //     });
  //   });
  // }

  // private readonly baseUrl = 'https://dummyjson.com/products';
  // private http = inject(HttpClient);

  // getProducts() {
  //   return this.http.get<{ products: ProductType[] }>(this.baseUrl);
  // }

  // getProductsByCategory(category: string) {
  //   return this.http.get<{ products: ProductType[] }>(
  //     this.baseUrl + '/category/' + category
  //   );
  // }
}
