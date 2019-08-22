export interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  // This script can be loaded from tableau.js file or CDN on
  // https://public.tableau.com/javascripts/api/tableau-2.min.js
  {
    name: 'tableau',
    src: './projects/tableau/src/lib/tableau.js'
  }
];
