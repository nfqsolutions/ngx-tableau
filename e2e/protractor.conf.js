// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

// Chrome options
const chromeOptions = [
  '--headless',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=1366,768',
];

// Spec reporter
const specReporter = new SpecReporter({
  spec: {
    displayStacktrace: true,
  },
});

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: chromeOptions,
    },
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {},
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json'),
    });

    // Spec reporter
    jasmine.getEnv().addReporter(specReporter);
  },
};
