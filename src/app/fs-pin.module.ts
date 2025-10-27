import { FsPinPanelDirective } from './directives/pin-panel/pin-panel.directive';
import { FsPinDirective } from './directives/pin/pin.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        FsPinDirective,
        FsPinPanelDirective,
    ],
    exports: [
        FsPinDirective,
        FsPinPanelDirective
    ],
})
export class FsPinModule {
  static forRoot(): ModuleWithProviders<FsPinModule> {
    return {
      ngModule: FsPinModule
    };
  }
}
