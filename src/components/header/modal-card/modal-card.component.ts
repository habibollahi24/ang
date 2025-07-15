import { Component, inject, OnInit } from '@angular/core';

import { LucideAngularModule, ShoppingCart, Trash } from 'lucide-angular';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-modal-card',
  imports: [LucideAngularModule],
  templateUrl: './modal-card.component.html',
})
export class ModalCardComponent implements OnInit {
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

  ngOnInit() {}
}

// <dialog id="cart_modal" class="modal">
//       <div class="modal-box">
//         <h3 class="text-lg font-bold">Hello!</h3>
//         <p class="py-4">Press ESC key or click outside to close</p>
//       </div>
//       <form method="dialog" class="modal-backdrop">
//         <button>close</button>
//       </form>
//     </dialog>
