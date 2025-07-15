import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ProductsService } from '../../../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productPagination',
  imports: [CommonModule],

  template: `
    @if(pages().length > 1) {

    <div class="join mt-6">
      @for (i of getPaginationRange(); track i) {
      <button
        *ngIf="i !== '...'; else dots"
        class="join-item btn"
        [class.btn-secondary]="i === currentPage()"
        (click)="goToPage(i)"
      >
        {{ i + 1 }}
      </button>
      <ng-template #dots>
        <button class="join-item btn btn-disabled">...</button>
      </ng-template>
      }
    </div>
    }
  `,
})
export class ProductPaginationComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  readonly limit = 9;

  readonly skip = signal(0);
  readonly currentPage = computed(() => Math.floor(this.skip() / this.limit));

  readonly pages = computed(() => {
    const count = Math.ceil(this.productService.total() / this.limit);
    return Array.from({ length: count }, (_, i) => i);
  });

  constructor() {
    effect(() => {
      this.route.queryParamMap.subscribe((params) => {
        const skipParam = +(params.get('skip') ?? 0);
        this.skip.set(skipParam);
      });
    });
  }

  goToPage(index: number) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: {
          skip: index * this.limit,
          limit: this.limit,
        },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  getPaginationRange(): (number | '...')[] {
    const totalPages = this.pages().length;
    const current = this.currentPage();
    const delta = 2; // چند صفحه اطراف صفحه فعلی نمایش داده بشه

    const range: (number | '...')[] = [];
    const left = Math.max(1, current - delta + 1);
    const right = Math.min(totalPages, current + delta + 1);

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        range.push(i - 1); // توجه کن که index ما از 0 هست
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }

    return range;
  }
}
