import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tableauVizUrl =
    'https://public.tableau.com/views/SuperSampleSuperstore/SuperDescriptive';

  serverUrl = '';

  ticket = '';

  site = '';

  report = '';

  filters = {};
}
