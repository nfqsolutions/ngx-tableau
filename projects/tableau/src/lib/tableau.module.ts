import { NgModule } from '@angular/core';
import { TableauComponent } from './tableau.component';
import { ScriptService } from './scripts.service';

@NgModule({
  imports: [],
  declarations: [TableauComponent],
  providers: [ScriptService],
  exports: [TableauComponent]
})
export class TableauModule {}
