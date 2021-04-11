import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent { 
  // Full Tableau URL
  tableauVizUrl =
    'https://public.tableau.com/views/SuperSampleSuperstore/SuperDescriptive';

  // Splitted Tableau Server URL and Report
  serverUrl = 'https://public.tableau.com';
  report = 'SuperSampleSuperstore/SuperDescriptive';

  // Report Filters
  filters = {}; 

  // Private Report
  ticket = '';

  // Multisite Tableau
  site = '';
}
