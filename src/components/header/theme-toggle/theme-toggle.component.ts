import { Component, effect, OnInit, signal } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

@Component({
  selector: 'app-theme-toggle',
  imports: [LucideAngularModule],
  template: `
    <button class="cursor-pointer" (click)="toggleTheme()">
      @if(theme() === 'dracula') {
      <lucide-icon [img]="Moon" class="stroke-1 size-7"></lucide-icon>
      } @else {
      <lucide-icon [img]="Sun" class="stroke-1 size-7"></lucide-icon>
      }
    </button>
  `,
})
export class ThemeToggleComponent implements OnInit {
  Moon = Moon;
  Sun = Sun;
  theme = signal<'light' | 'dracula'>(this.getInitialTheme());

  constructor() {
    // reactive: وقتی theme تغییر کرد، کلاس html تغییر کنه
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.theme());
      localStorage.setItem('theme', this.theme());
    });
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dracula' : 'light'));
  }

  private getInitialTheme(): 'light' | 'dracula' {
    const saved = localStorage.getItem('theme') as 'light' | 'dracula' | null;
    if (saved) return saved;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'dracula' : 'light';
  }

  ngOnInit() {}
}
