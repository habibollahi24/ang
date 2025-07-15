import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarIconsComponent } from './navbar-icons/navbar-icons.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, NavbarIconsComponent, RouterLinkActive],
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  isOpen = signal(false);

  toggleDropdown() {
    this.isOpen.update((v) => !v);
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  currentUrl = computed(() => this.router.url);

  isActive(path: string) {
    return this.currentUrl().startsWith(path);
  }

  ngOnInit() {}
}
