import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../service/products.service';
import { LucideAngularModule } from 'lucide-angular';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductPaginationComponent } from '../productPagination/productPagination.component';
import { ProductCardComponent } from '../productCard/productCard.component';

@Component({
  selector: 'app-productList',
  imports: [
    LucideAngularModule,
    ProductSearchComponent,
    ProductPaginationComponent,
    ProductCardComponent,
  ],
  // templateUrl: './productList.component.html',
  template: `
    <app-product-search></app-product-search>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      @if(isLoading()){
      <p>loading.....</p>
      } @for (product of products(); track product.id) {
      <app-productCard [product]="product"></app-productCard> }
    </div>
    <app-productPagination></app-productPagination>
  `,
})
export class ProductListComponent implements OnInit {
  private ProductsService = inject(ProductsService);
  products = this.ProductsService.products;
  isLoading = this.ProductsService.isLoading;

  ngOnInit() {}
}
