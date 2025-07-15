import { Component, OnInit } from '@angular/core';
import { ProductSiderbarComponent } from './product-siderbar/product-siderbar.component';
import { ProductListComponent } from './productList/productList.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [ProductSiderbarComponent, ProductListComponent],
})
export class ProductsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
