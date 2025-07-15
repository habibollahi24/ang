import { Component, inject, Input, OnInit } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';
import { ProductType } from '../../../service/products.service';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-productCard',
  imports: [LucideAngularModule],
  template: `
    <div class=" card bg-base-100 shadow-md hover:shadow-xl transition">
      <figure class="p-8 ">
        <img
          [src]="product.thumbnail || 'https://placehold.co/300x200'"
          alt="{{ product.title }}"
          class="rounded-xl h-28 object-cover"
        />
      </figure>
      <div class=" p-4 ">
        <h2 class="font-semibold text-sm line-clamp-1">
          {{ product.title }}
        </h2>

        <p class="text-xs font-semibold text-gray-500 line-clamp-1">
          {{ product.description }}
        </p>

        <div class="flex items-center justify-between my-4">
          <p class="font-bold text-secondary  ">\${{ product.price }}</p>
          <div class="flex gap-x-1">
            <lucide-icon
              [img]="Star"
              class="fill-yellow-500 stroke-amber-400"
            ></lucide-icon>
            <span>{{ product.rating }}</span>
          </div>
        </div>

        <div class="card-actions mt-4">
          <button
            (click)="handleAddToCart()"
            class="btn btn-secondary btn-sm w-full"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductType = {} as ProductType;
  private cart = inject(CartService);

  readonly Star = Star;

  handleAddToCart() {
    this.cart.addToCart(this.product);
  }

  ngOnInit() {}
}
