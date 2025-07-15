import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor() {}

  ccount = signal(0);

  increce() {
    this.ccount.update((c) => c + 1);
  }
  decrece() {
    this.ccount.update((c) => c - 1);
  }
  reset() {
    this.ccount.set(0);
  }
}
