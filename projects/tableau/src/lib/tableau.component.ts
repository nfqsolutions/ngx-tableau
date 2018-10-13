import { Component, OnInit, OnDestroy } from '@angular/core';
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
  tableauUrl =
    // tslint:disable-next-line:max-line-length
    'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes';

  constructor(scriptService: ScriptService) {
    scriptService
      .load('tableau')
      .then(data => {
        console.log('Tableau API successful loaded', data);
        this.renderTableauViz();
      })
      .catch(error => console.log(error));
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
      onFirstInteractive() {
        // The viz is now ready and can be safely used.
      }
    };

    // Usage of Tableau JS API to show visualization
    this.tableauViz = new tableau.Viz(placeholderDiv, this.tableauUrl, options);
  }

  ngOnDestroy() {
    // Dispose tableauViz to avoid memory leaks when component is destroyed
    if (this.tableauViz) {
      this.tableauViz.dispose();
    }
  }
}
