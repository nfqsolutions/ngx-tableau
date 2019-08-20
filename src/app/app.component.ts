import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tableauVizUrl = 'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages';

  // tableauVizUrl = '';

  ticket = '';

  site = 'AmazonRedshift';

  report = 'Analytics/Analytics_CF?:iid=2';
}
