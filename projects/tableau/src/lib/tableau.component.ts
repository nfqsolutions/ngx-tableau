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
    `
  ]
})
export class TableauComponent implements OnInit, OnDestroy {
  // TODO Iniciar README con roadmap e instucciones de arranque (especificación???)
  tableauViz;
  @Input() tableauVizUrl: string;

  @Input() ticket: string;

  @Input() site: string;

  @Input() report: string;

  serverUrl = 'https://tableau-nfq.nfqsolutions.es'; 

  constructor(scriptService: ScriptService) {
    scriptService
      .load('tableau')
      .then(data => {
        console.log('Tableau API successful loaded', data);
        this.renderTableauViz();
      })
      .catch(error => console.error('Tableau API not loaded', error));
  }

  ngOnInit() {
    console.log(this);
  }

  /**
   * Render a Tableau visualization, generating Tableau URL and using Tableau JS API to show vizualization
   */
  renderTableauViz() {
    const placeholderDiv = document.getElementById('tableauViz');
    const options = {
      hideTabs: false,
      width: '100%',
      height: '100%',
      onFirstInteractive() { // allows you to perform actions once the view has finished loading
        // The viz is now ready and can be safely used.
      }
    };

    if (this.checkRequiredInputs()) {
      console.log(this.tableauVizUrl);
    // Usage of Tableau JS API to show visualization
    this.tableauViz = new tableau.Viz(placeholderDiv, this.tableauVizUrl, options);
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
    if (this.ticket && this.site && this.report) {
      this.tableauVizUrl = `${this.serverUrl}/trusted/${this.ticket}/t/${this.site}/views/${this.report}`;
      return true;
    } else {
      console.error('One or each one of the following parameters are missing: ticket, site or report');
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
