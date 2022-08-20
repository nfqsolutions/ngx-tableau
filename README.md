# ngx-tableau

ngx-tableau is an Angular module that allows to embed a [Tableau](https://www.tableau.com/) report in an Angular webapp. You can see a working **DEMO** [here](https://stackblitz.com/edit/ngx-tableau).

## Getting started

Install ngx-tableau library using npm:

```bash
npm install ngx-tableau
```

Add TableauModule to imports section of your `app.module.ts` file:

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

You can pass configuration options to `ngx-tableau` using the following inputs to the component:

### tableauVizUrl

URL of a Tableau visualization to embed. Perfect for public visualizations or if you know the exact URL of the Tableau visualization. If this input is defined, the component will ignore the configuration options `serverUrl` and `report`. Example:

```html
<ngx-tableau
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

URL of Tableau server. If this input is defined, it is mandatory to fill at least `report` input. Example:

```html
<ngx-tableau
  serverUrl="https://public.tableau.com"
  report="AutonomousVehicles/AV"
></ngx-tableau>
```

### report

The name of the workbook and the view you want to embed separated by a slash. Mandatory if using `serverUrl`. Example:

```html
<ngx-tableau
  serverUrl="https://public.tableau.com"
  report="CityEyes/CityEyes"
></ngx-tableau>
```

### ticket

If you want to embed a private Tableau visuzalization skipping sign in page for your end users, you should set up trusted authentication. Passing the obtained ticket to this option saves your users from having to sign in Tableau Server. Example:

```html
<ngx-tableau
  serverUrl="https://myprivatetableau.mycompany.com"
  report="SomeWorkbook/SomeView"
  ticket="QUQub0EdSAaE39Eyg1oaLA==:9qT6oMvKUwXGr7TDpYKT9lvt"
></ngx-tableau>
```

### site

If it is a multi-site site server you will need to pass the name of the site. If you are using trusted authentication take into account that you should pass a `target_site` attribute to the request to obtain the ticket or the ticket will not be valid to embed your visualization.

```html
<ngx-tableau
  serverUrl="https://myprivatetableau.mycompany.com"
  report="myWorkbook/myView"
  ticket="QUQub0EdSAaE39Eyg1oaLA==:9qT6oMvKUwXGr7TDpYKT9lvt"
  site="mySite"
></ngx-tableau>
```

## Developing ngx-tableau library

In this repository there is the code of `ngx-tableau` library, located at `projects/tableau` and the code for a base Angular webapp located at `src/` which includes the library, to make development easier.

To setup the development environment execute `npm run build-tableau` to build the library and start the host Angular App with `npm start`.

Make changes in `projects/tableau/src/lib` and execute command `npm run build-tableau` to build tableau library module or execute `npm run build-tableau-watch` to build the library when there is any code change.

## Running tests for tableau library

Run `npm test` to execute ngx-tableau unit tests

Run `npm run ci` to execute ngx-tableau continous integration tests

## Deploying module on npm registry

First you should login with an existing user on npm registry. You can create a new account [here](https://docs.npmjs.com/creating-a-new-npm-user-account). Then execute `npm login` to sign in.

Update `package.json` with the latest version following semver syntax x.y.z

Run `npm run deploy` to upload a new version of ngx-tableau to public npm registry
