import { Directive, Input, ElementRef, inject } from '@angular/core';

@Directive({
    selector: '[fsPinPanel]',
    standalone: true,
})
export class FsPinPanelDirective {
  element = inject(ElementRef);


  @Input() panelClass;
  @Input() fixed = false;
  @Input() index = 0;
}
