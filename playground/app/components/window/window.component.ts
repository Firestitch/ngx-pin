import { FsPinDirective } from '@firestitch/package';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FsPinDirective as FsPinDirective_1 } from '../../../../src/app/directives/pin/pin.directive';
import { FsPinPanelDirective } from '../../../../src/app/directives/pin-panel/pin-panel.directive';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'example-window',
    templateUrl: 'window.component.html',
    styleUrls: ['window.component.scss'],
    standalone: true,
    imports: [FsPinDirective_1, FsPinPanelDirective, MatButton]
})
export class WindowComponent implements OnInit {

  @ViewChild(FsPinDirective) pin: FsPinDirective;
  public show = false;

  ngOnInit() {
    setTimeout(() => {
      this.show = true;
    }, 1000);
  }

  unpin(el) {
    this.pin.unpinElement(el);
  }
}
