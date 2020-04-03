// ============================================================================================================================================== //
// IMPORTS
// ============================================================================================================================================== //

var fs = require('fs');

// ============================================================================================================================================== //
// CONFIGURE STAGE
// ============================================================================================================================================== //

// Generate all 'pages' files so doesn't have to be inputted manually
let includePageFiles = {};
fs.readdirSync('./pages/').forEach(folder => { fs.readdirSync('./pages/' + folder).forEach(file => {
  includePageFiles[folder + '_' + file.replace('.js', '')] = './pages/' + folder + '/' + file; });});

// Parse the credentials file
var credentials = JSON.parse(fs.readFileSync('credentials.json'));

// If functional QA tests are run locally, use release deployment, else use squash deployment
var URL = "https://www.google.com/";
console.log("WebDriver.config.url: " + URL);

// ============================================================================================================================================== //
// CONFIG DICT
// ============================================================================================================================================== //

let config = {
  output: './output',
  helpers: {
    WebDriver: {
      //url: 'https://qatestbmw.motocommerce.ca/dealer/login',
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
    screenshotOnFail: {
      enabled: true
    },
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    },
    allure: {
      enabled: true
    }
  },
  multiple: {
    basic: {
      browsers: [
        'firefox',
        'chrome'
      ]
    }
  },
  name: 'Sample CodeceptJS Fwk',
  creds: credentials
}

exports.config = config;

// ============================================================================================================================================== //
// END OF FILE
// ============================================================================================================================================== //
