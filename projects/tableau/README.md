# ngx-tableau

ngx-tableau is an Angular module that allows to embed a [Tableau](https://www.tableau.com) report in an Angular webapp.

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
<ngx-tableau
  tableauVizUrl="https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages"
></ngx-tableau>

<ngx-tableau [tableauVizUrl]="tableauVizUrl"></ngx-tableau>
```

## Configuration options

You can pass configuration options to ngx-tableau using the following inputs:

- **tableauVizUrl**: URL of a public Tableau visualization to embed. Example of use:

```html
<ngx-tableau
  tableauVizUrl="https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes"
></ngx-tableau>
```

- **serverUrl**: URL base a Tableau visualization to embed.

- **ticket**: If your are using a private Tableau and you already have a way of authenticating users on the webpage or within your web application, you can avoid to sign in to Tableau Server and save your users from having to sign in twice by setting up trusted authentication.

- **site**: if it is a multi-site site server.

- **report**: the name of the workbook and the view separated by a slash.

- **filters**: object with the choosen filters on the appropriate format for Tableau visualitation to be initialize with.
