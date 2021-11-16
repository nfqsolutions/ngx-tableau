import { Component } from '@angular/core';
import { VizCreateOptions } from 'ngx-tableau/lib/vizCreateOptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Full Tableau URL
  tableauVizUrl =
    'https://public.tableau.com/views/SuperSampleSuperstore/SuperDescriptive';

  serverUrl="https://public.tableau.com"
  site=""
  report="SuperSampleSuperstore/SuperDescriptive"

  // Report Filters
  filters = {};

  // Private Report
  ticket = '';
  options: VizCreateOptions = {
    hideTabs: true,
    hideToolbar: true,
    disableUrlActionsPopups: true,
    toolbarPosition: (event) =>{
      console.log(event);
    },
    onFirstInteractive: (event) => {
      console.log('I was called', event);
    }
  };

}
