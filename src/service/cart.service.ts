import { computed, effect, Injectable, signal } from '@angular/core';

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly items = signal<CartItemType[]>(this.loadFromStorage());

  readonly cartItems = this.items.asReadonly();
  readonly totalCount = computed(() =>
    this.items().reduce((acc, item) => acc + item.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this.items().reduce((acc, item) => acc + item.quantity * item.price, 0)
  );

  constructor() {
    effect(() => {
      localStorage.setItem('cart-item', JSON.stringify(this.items()));
    });
  }

  private loadFromStorage(): CartItemType[] {
    try {
      const data = localStorage.getItem('cart-item');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addToCart(product: Omit<CartItemType, 'quantity'>) {
    const current = this.items();
    const index = current.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      const updated = [...current];
      updated[index].quantity++;
      this.items.set(updated);
    } else {
      this.items.set([...current, { ...product, quantity: 1 }]);
    }
  }

  removeFromCart(id: number) {
    this.items.set(this.items().filter((item) => item.id !== id));
  }

  increase(id: number) {
    this.items.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  decrease(id: number) {
    this.items.update((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }

  clearCart() {
    this.items.set([]);
  }
}
