import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, ShoppingCart, UserRound } from 'lucide-angular';
import { ModalCardComponent } from '../modal-card/modal-card.component';

@Component({
  selector: 'app-navbar-icons',
  template: `
    <div class="flex items-center gap-x-4">
      <app-modal-card></app-modal-card>
    </div>
  `,
  imports: [LucideAngularModule, ModalCardComponent],
})
export class NavbarIconsComponent implements OnInit {
  ShoppingCart = ShoppingCart;
  UserRound = UserRound;

  ngOnInit() {}
}
