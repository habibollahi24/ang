import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, ShoppingCart, UserRound } from 'lucide-angular';
import { ModalCardComponent } from '../modal-card/modal-card.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar-icons',
  template: `
    <div class="flex items-center gap-x-1">
      <app-theme-toggle></app-theme-toggle>
      <app-modal-card></app-modal-card>
    </div>
  `,
  imports: [LucideAngularModule, ModalCardComponent, ThemeToggleComponent],
})
export class NavbarIconsComponent implements OnInit {
  ShoppingCart = ShoppingCart;
  UserRound = UserRound;

  ngOnInit() {}
}
