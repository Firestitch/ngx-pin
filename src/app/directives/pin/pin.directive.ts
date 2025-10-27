import { takeUntil } from 'rxjs/operators';

import { FsPinService } from './../../services/pin.service';
import { Directive, ElementRef, AfterContentInit, ContentChildren, QueryList, Input, IterableDiffers, IterableDiffer, OnDestroy, AfterViewInit } from '@angular/core';
import { FsPinPanelDirective } from '../pin-panel/pin-panel.directive';
import { Subject } from 'rxjs';

@Directive({
    selector: '[fsPin]',
    providers: [FsPinService],
    standalone: true
})
export class FsPinDirective implements AfterViewInit, OnDestroy {

  @ContentChildren(FsPinPanelDirective, { descendants: true }) pinPanels: QueryList<FsPinPanelDirective>;

  @Input() container: any;

  private _differ: IterableDiffer<any>;
  private _destroy$ = new Subject();

  constructor(private _pinService: FsPinService,
              private _el: ElementRef,
              private _differs: IterableDiffers) {
    this._differ = this._differs.find([]).create(null);
  }

  public ngAfterViewInit() {

    let container = this._el.nativeElement;

    if (this.container) {
      if (this.container === 'window') {
        container = window;
      } else {
        container = this.container;
      }
    }

    this._pinService.init(container);

    const changeDiff = this._differ.diff(this.pinPanels);
    if (changeDiff) {
      changeDiff.forEachAddedItem(change => {
        this._pinService.pinDirective(change.item);
      });
    }

    this.pinPanels.changes
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(pinPanels => {
        const changeDiff = this._differ.diff(pinPanels);

        if (changeDiff) {
          changeDiff.forEachAddedItem(change => {
            this._pinService.pinDirective(change.item);
          });

          changeDiff.forEachRemovedItem((change) => {
            this._pinService.unpinDirective(change.item);
          });
        }
      });
  }

  public unpinElement(el) {
    this._pinService.unpinElement(el);
  }

  public destroy() {
    this._pinService.destroy();
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
