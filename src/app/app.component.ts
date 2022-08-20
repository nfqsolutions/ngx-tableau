import { Component } from '@angular/core';
import { VizCreateOptions, ToolbarPosition } from 'ngx-tableau';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Full Tableau URL
  tableauVizUrl =
    'https://public.tableau.com/views/SuperSampleSuperstore/SuperDescriptive';

  // Splitted Tableau Server URL and Report 
  serverUrl="https://public.tableau.com";
  report="SuperSampleSuperstore/SuperDescriptive";
  // Multisite - only if using a site different from Default
  site="";

  // Options
  options: VizCreateOptions = {
    hideTabs: true,
    hideToolbar: false,
    disableUrlActionsPopups: true,
    toolbarPosition: ToolbarPosition.TOP,
    onFirstInteractive: (event) => {
      console.log('I was called', event);
    }
  };

  // Report Filters
  filters = {};

  // Private Report
  ticket = '';

  // Loaded event
  handleOnLoaded = (loaded) => console.log("Loaded", loaded)
}
