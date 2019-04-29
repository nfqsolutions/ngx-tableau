import { AppPage } from './app.po';

describe('ngx-tableau', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display tableauViz container', () => {
    page.navigateTo();
    expect(page.getTableauVizContainer()).toBeDefined();
  });
});
