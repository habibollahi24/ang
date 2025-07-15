import { Component, inject } from '@angular/core';

import { LucideAngularModule, ShoppingCart, Trash } from 'lucide-angular';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-modal-card',
  imports: [LucideAngularModule],
  templateUrl: './modal-card.component.html',
})
export class ModalCardComponent {
  private cart = inject(CartService);
  readonly items = this.cart.cartItems;
  readonly total = this.cart.totalPrice;

  ShoppingCart = ShoppingCart;
  Trash = Trash;

  increase(id: number) {
    this.cart.increase(id);
  }

  decrease(id: number) {
    this.cart.decrease(id);
  }

  remove(id: number) {
    this.cart.removeFromCart(id);
  }
}
