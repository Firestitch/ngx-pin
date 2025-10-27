import { Component } from '@angular/core';
import { FsPinDirective } from '../../../../src/app/directives/pin/pin.directive';
import { NgClass } from '@angular/common';
import { FsPinPanelDirective } from '../../../../src/app/directives/pin-panel/pin-panel.directive';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'kitchen-sink',
    templateUrl: 'kitchen-sink.component.html',
    styleUrls: ['kitchen-sink.component.scss'],
    standalone: true,
    imports: [FsPinDirective, NgClass, FsPinPanelDirective, MatButton]
})
export class KitchenSinkComponent {

  public config = {};
  public elementClass = ['element-container'];

}
