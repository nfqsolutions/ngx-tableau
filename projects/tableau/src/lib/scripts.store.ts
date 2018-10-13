export interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  // Este script se puede cargar del tableau.js o del CDN
  // https://public.tableau.com/javascripts/api/tableau-2.min.js
  {
    name: 'tableau',
    src: './projects/tableau/src/lib/tableau.js'
  }
];
