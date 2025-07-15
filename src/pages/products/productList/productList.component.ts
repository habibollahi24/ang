import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../service/products.service';
import { LucideAngularModule } from 'lucide-angular';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductPaginationComponent } from '../productPagination/productPagination.component';
import { ProductCardComponent } from '../productCard/productCard.component';
import { SkeltonComponent } from '../../../components/skelton/skelton.component';

@Component({
  selector: 'app-productList',
  imports: [
    LucideAngularModule,
    ProductSearchComponent,
    ProductPaginationComponent,
    ProductCardComponent,
    SkeltonComponent,
  ],
  // templateUrl: './productList.component.html',
  template: `
    <app-product-search></app-product-search>

    @if(isLoading()){
    <app-skelton></app-skelton>
    } @else {
    <div class="grid grid-cols-12 gap-3">
      @for (product of products(); track product.id) {
      <app-productCard
        class="col-span-12 md:col-span-4"
        [product]="product"
      ></app-productCard>
      }
    </div>
    }

    <app-productPagination></app-productPagination>
  `,
})
export class ProductListComponent implements OnInit {
  private ProductsService = inject(ProductsService);
  products = this.ProductsService.products;
  isLoading = this.ProductsService.isLoading;

  ngOnInit() {}
}
