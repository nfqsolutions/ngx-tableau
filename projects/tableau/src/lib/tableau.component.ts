import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ScriptService } from './scripts.service';
declare var tableau: any;

@Component({
  selector: 'ngx-tableau',
  template: `
    <div class="ngx-tableau-viz" id="tableauViz"></div>
  `,
  styles: [
    `
      .ngx-tableau-viz {
        z-index: 1;
        height: calc(100vh - 20px);
      }
    `,
  ],
})
export class TableauComponent implements OnInit, OnDestroy {
  tableauViz;
  @Input() tableauVizUrl: string;

  @Input() serverUrl: string;

  @Input() ticket: string;

  @Input() site: string;

  @Input() report: string;

  @Input() filters: object;

  constructor(scriptService: ScriptService) {
    scriptService
      .load('tableau')
      .then(data => {
        console.log('Tableau API successful loaded', data);
        this.renderTableauViz();
      })
      .catch(error => console.error('Tableau API not loaded', error));
  }

  ngOnInit() {}

  /**
   * Render a Tableau visualization, generating Tableau URL and using Tableau JS API to show vizualization
   */
  renderTableauViz() {
    const placeholderDiv = document.getElementById('tableauViz');
    const options = {
      hideTabs: false,
      width: '100%',
      height: '100%',
      ...this.filters,
      onFirstInteractive() {
        // Allows you to perform actions once the view has finished loading
        // The viz is now ready and can be safely used.
      },
    };

    if (this.checkRequiredInputs()) {
      // Usage of Tableau JS API to show visualization
      this.tableauViz = new tableau.Viz(
        placeholderDiv,
        this.tableauVizUrl,
        options
      );
    }
  }

  /**
   * Check if all required inputs for embedding a Tableau visualization are set
   * @returns true if all required inputs are set, false otherwise
   */
  checkRequiredInputs(): boolean {
    if (!this.tableauVizUrl) {
      return this.createUrlFromInputs();
    } else {
      console.log(`Using Tableau visualization URL: ${this.tableauVizUrl}`);
    }

    return true;
  }

  createUrlFromInputs() {
    if (this.ticket && this.serverUrl && this.report) {
      if (this.site) {
        this.tableauVizUrl = `${this.serverUrl}/trusted/${this.ticket}/t/${this.site}/views/${this.report}`;
        console.log(
          `Using Tableau visualization URL for private multisite: ${this.tableauVizUrl}`
        );
        return true;
      } else {
        this.tableauVizUrl = `${this.serverUrl}/trusted/${this.ticket}/views/${this.report}`;
        console.log(
          `Using Tableau visualization URL for private site: ${this.tableauVizUrl}`
        );
        return true;
      }
    } else if (this.serverUrl && this.report) {
      this.tableauVizUrl = `${this.serverUrl}/views/${this.report}`;
      console.log(
        `Using Tableau visualization URL for public site: ${this.tableauVizUrl}`
      );
      return true;
    } else {
      console.error(
        'One or both of the following parameters are missing: serverUrl or report'
      );
      return false;
    }
  }

  ngOnDestroy() {
    // Dispose tableauViz to avoid memory leaks when component is destroyed
    if (this.tableauViz) {
      this.tableauViz.dispose();
    }
  }
}
