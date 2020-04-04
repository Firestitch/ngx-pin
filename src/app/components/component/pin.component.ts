import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fs-pin',
  templateUrl: 'pin.component.html',
  styleUrls: [ 'pin.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsPinComponent {

  constructor() {
  }
}
