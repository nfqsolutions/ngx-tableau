import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableauModule } from 'tableau';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TableauModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
