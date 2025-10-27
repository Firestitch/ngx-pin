import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[fsPinPanel]',
    standalone: true,
})
export class FsPinPanelDirective {

  @Input() panelClass;
  @Input() fixed = false;
  @Input() index = 0;

  constructor(public element: ElementRef) {}
}
