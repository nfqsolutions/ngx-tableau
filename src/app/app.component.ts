import { Component } from '@angular/core';
import { VizCreateOptions, ToolbarPosition, TableauEvents } from 'ngx-tableau';

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
  handleOnLoaded = (loaded) => console.log("Tableau JS API loaded", loaded)

  handleOnTableauVizLoaded = (tableauViz) => {
    console.log("Tableau viz loaded", tableauViz)
    tableauViz.addEventListener(TableauEvents.TAB_SWITCH, (event)=>{console.log("Tab changed", event)})
    tableauViz.addEventListener(TableauEvents.PARAMETER_VALUE_CHANGE, (event)=>{console.log("Parameter value changed", event)})
    tableauViz.addEventListener(TableauEvents.MARKS_SELECTION, (event)=>{console.log("Marks selection", event)})
  }
}
