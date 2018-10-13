import { Component, OnInit, OnDestroy } from '@angular/core';
declare var tableau: any;

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit, OnDestroy {
  // TODO extraer a una librería
  // TODO Iniciar README con roadmap e instucciones de arranque (especificación???)
  // TODO Probar a hacer un test
  tableauViz;
  tableauUrl =
    'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes';

  constructor() {}

  ngOnInit() {
    this.getTableau();
  }

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
