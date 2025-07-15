import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skelton',
  template: `
    <div class="grid grid-cols-12 gap-3">
      @for (i of [1,2,3,4,5,6]; track i) {
      <div
        class="col-span-12 md:col-span-4 card bg-base-100 shadow-sm animate-pulse"
      >
        <div class="h-48 bg-base-300 rounded-t"></div>
        <div class="card-body">
          <div class="h-4 bg-base-300 rounded w-2/3 mb-2"></div>
          <div class="h-3 bg-base-300 rounded w-full mb-1"></div>
          <div class="h-3 bg-base-300 rounded w-5/6 mb-4"></div>
          <div class="flex justify-end">
            <div class="btn btn-disabled h-8 w-full bg-base-300 border-0"></div>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class SkeltonComponent {}
