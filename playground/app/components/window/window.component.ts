import { FsPinDirective } from '@firestitch/package';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'example-window',
  templateUrl: 'window.component.html',
  styleUrls: ['window.component.scss']
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
