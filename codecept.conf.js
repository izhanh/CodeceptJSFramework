// ============================================================================================================================================== //
// IMPORTS
// ============================================================================================================================================== //

var fs = require('fs');
var request = require('request');

// ============================================================================================================================================== //
// CONFIGURE STAGE
// ============================================================================================================================================== //

// Generate all 'pages' files so doesn't have to be inputted manually
let includePageFiles = {};
fs.readdirSync('./pages/').forEach(folder => { fs.readdirSync('./pages/' + folder).forEach(file => {
  includePageFiles[folder + '_' + file.replace('.js', '')] = './pages/' + folder + '/' + file; });});

var packageJSON = JSON.parse(fs.readFileSync('package.json'));
var credentials = JSON.parse(fs.readFileSync('credentials.json'));

// If functional QA tests are run locally, use release deployment, else use squash deployment
var URL = "https://www.google.es";
console.log("WebDriver.config.url: " + URL);

// ============================================================================================================================================== //
// CONFIG DICT
// ============================================================================================================================================== //

let config = {
  output: './output',
  helpers: {
    WebDriver: {
      url: URL,
      browser: 'chrome',
      desiredCapabilities: {
        chromeOptions: {
          //args: [ "--headless", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage", "--window-size=1300,1000" ]
        }
      },
      windowSize: 'maximize',
      waitForTimeout: 20000,
      smartWait: 5000,
      restart: true
    },
    CustomHelper: {
      require: './helpers/customHelper.js'
    },
    AssertWrapper : {
      require: 'codeceptjs-assert',
    },
    MailSlurp: {
      require: '@codeceptjs/mailslurp-helper',
      apiKey: '[mail_slurp_api_key]'
    }
  },
  include: includePageFiles,
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: './step_definitions/*/*.js'
  },
  plugins: {
    allure: { enabled: true },
    pauseOnFail: { enabled: true },
    screenshotOnFail: { enabled: true },
    wdio: { enabled: true, services: ['selenium-standalone', 'devtools'] },
  },
  multiple: {
    basic: {
      browsers: ['firefox', 'chrome']
    }
  },
  name: 'CodeceptJS Sample Fwk',
  creds: credentials
}

exports.config = config;

// ============================================================================================================================================== //
// END OF FILE
// ============================================================================================================================================== //
