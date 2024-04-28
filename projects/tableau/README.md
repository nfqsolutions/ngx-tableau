# ngx-tableau

ngx-tableau is an Angular module that allows to embed a [Tableau](https://www.tableau.com) report in an Angular webapp.
You can see a working **DEMO** [here](https://stackblitz.com/edit/ngx-tableau).

<div style="background-color: #56adff69; border-radius: 4px;">
  <p style="padding: 16px">
    <a href="https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api.htm" target="_blank">The Tableau JavaScript API was deprecated as of February 2024</a> in favor of the new <a href="https://help.tableau.com/current/api/embedding_api/en-us/index.html" target="_blank">Embedding API v3</a>, which exposes a web component with the features provided by this module.
    <br/><br/>
    It is strongly suggested to migrate to the new Embedding API v3, for which this <a href="https://help.tableau.com/current/api/embedding_api/en-us/docs/embedding_api_migration_guide.html" target="_blank">migration guide</a> may be useful.
    <br/><br/>
    <strong>As Tableau now provides an official replacement for this module, this module will not be maintained anymore.</strong> Thanks to all of you who have used it.
  </p>
</div>

## Prerequisites

- NodeJS version 16+ for 2.x versions
- NodeJS version 10+ for 1.x versions

## Getting started

Install ngx-tableau library using npm:

```shell
npm install ngx-tableau
```

Add TableauModule to `imports` section of your `app.module.ts` file:

```typescript
import { TableauModule } from 'ngx-tableau';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TableauModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

The most basic use is just passing a public Tableau visualization URL.

```html
<!-- Using report URL directly on HTML -->
<ngx-tableau
  tableauVizUrl="https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages"
></ngx-tableau>

<!-- Using report URL defined on view controller -->
<ngx-tableau [tableauVizUrl]="tableauVizUrl"></ngx-tableau>
```

## Configuration options

You can pass configuration options to ngx-tableau using the following inputs to the component:

### tableauVizUrl

URL of a Tableau visualization to embed. Perfect for [public visualizations](https://public.tableau.com/gallery) or if you know the exact URL of the Tableau visualization. If this input is defined, the component will ignore the configuration options `serverUrl` and `report`. Example:

```html
<ngx-tableau
  tableauVizUrl="https://public.tableau.com/views/AroundtheAntarctic/MapClean"
></ngx-tableau>
```

### tableauJsApiUrl

URL of Tableau JavaScript API v2, to be able to load a custom version (public or from your own Tableau Server). The default Tableau JavaScript API loaded if this variable is not set is `https://public.tableau.com/javascripts/api/tableau-2.9.1.min.js`. Example:

```html
<ngx-tableau
  tableauJsApiUrl="https://public.tableau.com/javascripts/api/tableau-2.9.1.min.js"
  tableauVizUrl="https://public.tableau.com/views/AroundtheAntarctic/MapClean"
></ngx-tableau>
```

### options

Visualization options for the Tableau view available in the [JavaScript API](https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#vizcreateoptions_record). It should be a JSON object. Example:

```typescript
import { VizCreateOptions, ToolbarPosition } from 'ngx-tableau'

// Options
options: VizCreateOptions = {
  hideTabs: true,
  hideToolbar: false,
  disableUrlActionsPopups: true,
  toolbarPosition: ToolbarPosition.TOP,
  onFirstInteractive: (event) => {
    console.log('On first interactive event!', event);
  }
};
```

``` html
<ngx-tableau
  tableauVizUrl="https://public.tableau.com/views/SuperSampleSuperstore/SuperDescriptive"
  [options]="options"
></ngx-tableau>
```

### filters

Filters to pass to the Tableau visualization. It should be a JSON object. Example:

```html
<ngx-tableau
  tableauVizUrl="https://public.tableau.com/views/SuperSampleSuperstore/SuperDescriptive"
  filters="{ Parameter3: 'Central' }"
></ngx-tableau>
```

### serverUrl

URL of Tableau server. If this input is defined, it is mandatory to fill at least _report_ input. Example:

```html
<ngx-tableau
  serverUrl="https://public.tableau.com"
  report="AutonomousVehicles/AV"
></ngx-tableau>
```

### report

The name of the workbook and the view ypu want to embed separated by a slash. Mandatory if using _serverUrl_. Example:

```html
<ngx-tableau
  serverUrl="https://public.tableau.com"
  report="CityEyes/CityEyes"
></ngx-tableau>
```

### ticket

If you want to embed a private Tableau visuzalization skipping sign in page for your end users, you should set up [trusted authentication](https://help.tableau.com/current/server/en-us/trusted_auth.htm). Passing the obtained ticket to this option saves your users from having to sign in Tableau Server. Example:

```html
<ngx-tableau
  serverUrl="https://myprivatetableau.mycompany.com"
  report="SomeWorkbook/SomeView"
  ticket="QUQub0EdSAaE39Eyg1oaLA==:9qT6oMvKUwXGr7TDpYKT9lvt"
></ngx-tableau>
```

### site

If it is a multi-site site server you will need to pass the name of the site. If you are using trusted authentication take into account that you should pass a _target_site_ attribute to the request to obtain the ticket or the ticket will not be valid to embed your visualization.

```html
<ngx-tableau
  serverUrl="https://myprivatetableau.mycompany.com"
  report="myWorkbook/myView"
  ticket="QUQub0EdSAaE39Eyg1oaLA==:9qT6oMvKUwXGr7TDpYKT9lvt"
  site="mySite"
></ngx-tableau>
```

### debugMode

Enables the debug mode of the component, which will show log traces in thde console.

```html
<ngx-tableau
  tableauVizUrl="https://public.tableau.com/views/SuperSampleSuperstore/SuperDescriptive"
  [debugMode]="true"
></ngx-tableau>
```

## Handling events

You can add or remove [event listeners](https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#viz_event_classes) for the Tableau Viz object.

```html
<ngx-tableau
  serverUrl="https://public.tableau.com/views/SuperSampleSuperstore/SuperDescriptive"
  (tableauVizLoaded)="handleOnTableauVizLoaded($event)"
></ngx-tableau>
```

```typescript
import { TableauEvents } from 'ngx-tableau';

handleOnTableauVizLoaded = (tableauViz) => {
  console.log("Tableau viz loaded", tableauViz);

  tableauViz.addEventListener(TableauEvents.TAB_SWITCH, (event)=>{
    console.log(`Tab changed from '${event.getOldSheetName()}' to '${event.getNewSheetName()}'`, event)
  })
}
```

For a complete reference about Viz event types and specific handling, see the official [documentation](https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#viz_event_classes).
