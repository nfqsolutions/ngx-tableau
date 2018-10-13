import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScriptService } from './scripts.service';
declare var tableau: any;

@Component({
  selector: 'ngx-tableau',
  template: `
    <p>Still working!</p>
    <div style="z-index: 1" id="tableauViz"></div>
  `,
  styles: []
})
export class TableauComponent implements OnInit, OnDestroy {
  // TODO Iniciar README con roadmap e instucciones de arranque (especificación???)
  // TODO Probar a hacer un test
  tableauViz;
  tableauUrl =
    'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes';

  constructor(scriptService: ScriptService) {
    scriptService
      .load('tableau')
      .then(data => {
        console.log('script loaded ', data);
        this.getTableau();
      })
      .catch(error => console.log(error));
  }

  ngOnInit() {}

  getTableau() {
    const placeholderDiv = document.getElementById('tableauViz');
    const options = {
      hideTabs: false,
      width: '100%',
      height: '100%',
      onFirstInteractive() {
        // The viz is now ready and can be safely used.
      }
    };

    this.tableauViz = new tableau.Viz(placeholderDiv, this.tableauUrl, options);
  }

  ngOnDestroy() {
    if (this.tableauViz) {
      this.tableauViz.dispose();
    }
  }
}
