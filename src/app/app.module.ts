import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableauComponent } from './tableau/tableau.component';
import { TableauModule } from 'tableau';
import { ScriptService } from './scripts.service';

@NgModule({
  declarations: [AppComponent, TableauComponent],
  imports: [BrowserModule, TableauModule],
  providers: [ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule {}
