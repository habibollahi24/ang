import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  productId = this.route.snapshot.paramMap.get('id');

  ngOnInit() {}
}
