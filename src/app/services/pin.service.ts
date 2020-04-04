import { FsPinPanelDirective } from './../directives/pin-panel/pin-panel.directive';
import { throttleTime, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject, Subscription, fromEvent } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { remove } from 'lodash-es';


@Injectable()
export class FsPinService implements OnDestroy {

  private _scroll$: Observable<any>;
  private _resize$: Observable<any>;
  private _scrollSubscription: Subscription;

  private _panels: {
    el: any,
    anchor: any,
    fixed: boolean,
    class: string,
    index: number
  }[] = [];

  private _destroy$ = new Subject();
  private _target;

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    this.destroy();
  }

  public init(containerEl: any) {

    this._target = containerEl === window ? containerEl.document.documentElement : containerEl;

    this._scroll$ = fromEvent(containerEl, 'scroll')
    .pipe(
      takeUntil(this._destroy$),
      throttleTime(10),
      tap((e: any) => {
        this.calculate();
      })
    );

    this._resize$ = fromEvent(window, 'resize')
    .pipe(
      takeUntil(this._destroy$),
      throttleTime(20),
      tap((e: any) => {
        this.calculate();
      })
    );


    this._scrollSubscription = this._scroll$
    .subscribe(event => {});

    this._resize$
    .subscribe(event => {});
  }

  public unpinDirective(pinPanel: FsPinPanelDirective) {
    this.unpinElement(pinPanel.element.nativeElement);
  }

  public pinDirective(pinPanel: FsPinPanelDirective) {

    const config = {
      class: pinPanel.panelClass,
      fixed: pinPanel.fixed,
      index: pinPanel.index,
    };

    this.pinElement(pinPanel.element.nativeElement, config);
  }
  public pinElement(el: any, config: { class?: string, index?: number, fixed?: boolean } = {}) {

    const anchor = document.createElement('div');
    anchor.classList.add('fs-pin-anchor');
    el.parentNode.insertBefore(anchor, el);

    this._panels.push({ el: el, anchor: anchor, class: config.class, index: config.index, fixed: config.fixed });

    this.calculate();
  }

  public unpinElement(el: any) {
    const panel = this._panels.find(item => {
      return item.el.isSameNode(el);
    });

    if (panel) {
      panel.anchor.remove();
      panel.el.classList.remove('fs-pin-panel');
      panel.el.classList.remove('fs-pin-panel-fixed');

      remove(this._panels, (item) => {
        return panel === item;
      });
    }
  }

  public destroy() {

    this._panels.forEach(panel => {
      this.unpinElement(panel.el);
    });

    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
    }
  }

  public calculate() {

    this._panels.forEach(panel => {

      const topOffset = this._getOffset(panel.anchor, this._target);

      const height  = this._target.scrollTop + this._target.clientHeight;

      if (height < (topOffset + panel.el.offsetHeight)) {
        panel.el.classList.add('fs-pin-panel');

        if (panel.fixed) {
          panel.el.classList.add('fs-pin-panel-fixed');
        }

        if (panel.class) {
          panel.el.classList.add(panel.class);
        }

        if (panel.index) {
          panel.el.style.zIndex = panel.index + 999;
        }

      } else {
        panel.el.classList.remove('fs-pin-panel');
        panel.el.classList.remove('fs-pin-panel-fixed');
        panel.el.classList.remove(panel.class);

        if (panel.index) {
          panel.el.style.zIndex = null;
        }
      }
    });
  }

  private _getOffset(element, target) {

    if (!element) {
      return 0;
    } else if (target.isSameNode(element.parentNode)) {
      return element.offsetTop;
    }

    return this._getOffset(element.offsetParent, target) + element.offsetTop;
  }
}
