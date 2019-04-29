import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTableauVizContainer() {
    return element(by.id('tableauViz'));
  }
}
