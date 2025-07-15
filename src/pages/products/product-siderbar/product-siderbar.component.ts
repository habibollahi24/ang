import { Component, inject, OnInit, signal } from '@angular/core';
import {
  CategoryService,
  CategoryType,
} from '../../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-siderbar',

  template: `
    <button class="btn md:hidden" onclick="filter_modal.showModal()">
      filter
    </button>
    <dialog id="filter_modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <div class="modal-action">
          <form method="dialog">
            <button>close</button>
          </form>
        </div>
        <ul class="space-y-2  p-4 rounded-md">
          @for (cat of categories(); track cat.slug) {
          <li
            [class]="
              cat.slug === currentCategory()
                ? 'text-secondary font-bold'
                : 'text-gray-500 hover:text-secondary'
            "
            (click)="filterByCategory(cat.slug)"
            class="cursor-pointer block"
          >
            {{ cat.name }}
          </li>
          }
        </ul>
      </div>
    </dialog>

    <div class="hidden md:block sticky top-20 ">
      <div class="flex items-center gap-x-2 mb-4">
        <h3 class="text-lg font-bold ">Categories</h3>
        <button
          class="btn btn-sm btn-link text-red-500"
          (click)="resetFilters()"
        >
          Reset Filters
        </button>
      </div>
      <ul
        class="scrollbar-thin space-y-2 h-[300px] overflow-y-scroll shadow p-4 rounded-xl scrollbar-thin"
      >
        @for (cat of categories(); track cat.slug) {
        <li
          [class]="
            cat.slug === currentCategory()
              ? 'text-secondary font-bold'
              : 'text-gray-500 hover:text-secondary'
          "
          (click)="filterByCategory(cat.slug)"
          class="cursor-pointer block"
        >
          {{ cat.name }}
        </li>
        }
      </ul>
    </div>
  `,
})
export class ProductSiderbarComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly categories = signal<CategoryType[]>([]);
  readonly currentCategory = signal<string | null>('');

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((data) => this.categories.set(data));

    this.route.queryParamMap.subscribe((params) => {
      const category = params.get('category');
      this.currentCategory.set(category);
    });
  }

  resetFilters() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: null,
        q: null,
        skip: null,
        limit: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  filterByCategory(slug: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: slug, skip: null, q: null, limit: null },
      queryParamsHandling: 'merge',
    });
    const modal = document.getElementById('filter_modal') as HTMLDialogElement;
    modal?.close();
  }
}
