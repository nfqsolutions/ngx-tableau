import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // tableauVizUrl = 'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages';

  // tableauVizUrl =
  //   'https://public.tableau.com/views/ZodiacConstellations/Dashboard';

  // tableauVizUrl = '';

  // serverUrl = 'https://tableau-nfq.nfqsolutions.es';

  serverUrl = 'https://public.tableau.com';

  ticket = '';

  site = 'AmazonRedshift';

  // report = 'Analytics/Analytics_CF?:iid=2';

  report = 'ZodiacConstellations/Dashboard';
}
