import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ScriptService } from './scripts.service';
import { VizCreateOptions } from './vizCreateOptions';

declare var tableau: any;

export interface Viz {
  dispose(): any;
  show(): any;
  hide(): any;
  pauseAutomaticUpdatesAsync(): any;
  resumeAutomaticUpdatesAsync(): any;
  toggleAutomaticUpdatesAsync(): any;
  revertAllAsync(): any;
  refreshDataAsync(): any;
  showDownloadDialog(): any;
  showDownloadWorkbookDialog(): any;
  showExportImageDialog(): any;
  showExportPDFDialog(): any;
}

@Component({
  selector: 'ngx-tableau',
  template: ` <div class="ngx-tableau-viz" id="tableauViz"></div> `,
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
  scriptService;

  tableauViz!: Viz;

  @Output() loaded = new EventEmitter();

  @Output() tableauVizLoaded = new EventEmitter();

  @Input() tableauVizUrl!: string;

  @Input() serverUrl!: string;

  @Input() ticket!: string;

  @Input() site!: string;

  @Input() report!: string;

  @Input() filters!: object;

  @Input() options!: VizCreateOptions;

  @Input() debugMode: boolean = false;

  constructor(scriptService: ScriptService) {
    this.scriptService = scriptService;
  }

  debug(message: string, data: any = {}) {
    if (this.debugMode) {
      data ? console.log(message) : console.log(message, data);
    }
  }

  ngOnInit() {
    this.scriptService
      .load('tableau')
      .then(data => {
        this.debug('Tableau API successful loaded', data);
        this.renderTableauViz();
        this.loaded.emit(data);
      })
      .catch(error => console.error('Tableau API not loaded', error));
  }

  /**
   * Render a Tableau visualization, generating Tableau URL and using Tableau JS API to show vizualization
   */
  renderTableauViz() {
    const placeholderDiv = document.getElementById('tableauViz');
    const options = {
      ...this.options,
      ...this.filters,
    };
    if (this.checkRequiredInputs()) {
      // Usage of Tableau JS API to show visualization
      this.tableauViz = new tableau.Viz(
        placeholderDiv,
        this.tableauVizUrl,
        options
      ) as Viz;
      this.tableauVizLoaded.emit(this.tableauViz);
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
      this.debug(`Using Tableau visualization URL: ${this.tableauVizUrl}`);
    }

    return true;
  }

  multisiteUrlOrNot() {
    if (this.site) {
      return `/t/${this.site}/views/${this.report}`;
    } else {
      return `/views/${this.report}`;
    }
  }

  createUrlFromInputs() {
    if (this.ticket && this.serverUrl && this.report) {
      const endOfUrl = this.multisiteUrlOrNot();

      this.tableauVizUrl = `${this.serverUrl}/trusted/${this.ticket}${endOfUrl}`;
      this.debug(
        `Using Tableau visualization URL for private site: ${this.tableauVizUrl}`
      );
      return true;
    } else if (this.serverUrl && this.report) {
      const endOfUrl = this.multisiteUrlOrNot();

      this.tableauVizUrl = `${this.serverUrl}${endOfUrl}`;
      this.debug(
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
