import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  imports: [FormsModule],

  template: `
    <form class="flex items-center gap-x-2 mb-4" (submit)="onSearch()">
      <input
        type="text"
        name="search"
        [(ngModel)]="q"
        placeholder="Search..."
        class="input input-bordered w-full "
      />
      <button type="submit" class="btn btn-secondary">search</button>
    </form>
  `,
})
export class ProductSearchComponent {
  q: string = '';
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onSearch() {
    if (!this.q) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.q },
      queryParamsHandling: 'merge',
    });
  }
}
