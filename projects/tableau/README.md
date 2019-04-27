# ngx-tableau

ngx-tableau is a library to embed Tableau visualitation into Angular apps.

## Getting started

The most basic use is just passing a public Tableau visualization URL

```html
<ngx-tableau tableauVizUrl="https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes"></ngx-tableau>

<ngx-tableau [tableauVizUrl]="tableauVizUrl"></ngx-tableau>
```

## Configuration options

You can pass configuration options to ngx-tableau using the following inputs:

**tableauVizUrl**: URL of a public Tableau visualization to embed. Example of use:

```html
<ngx-tableau tableauVizUrl="https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes"></ngx-tableau>
```