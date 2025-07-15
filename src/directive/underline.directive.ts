import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[underline]',
})
export class UnderlineDirective {
  constructor(private el: ElementRef) {}

  @Input('underline') underline: boolean = true;
}
