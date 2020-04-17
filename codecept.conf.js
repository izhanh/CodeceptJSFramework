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
var domainBase = process.env.UNHAGGLE_BASE_DOMAIN;
var domainBranch = process.env.UNHAGGLE_BRANCH_NAME;
if (!process.env.SQUASH_BRANCH) {
    var URL = "https://test-usa--release-gz7y0.docker2.motocommerce.ca/dealer/";
} else {
    var URL = "https://" + credentials.environment.user + ":" + credentials.environment.pass
      + "@test-usa--" + domainBranch + "." + domainBase + "/dealer/";
}
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
    MailSlurp: {
      require: '@codeceptjs/mailslurp-helper',
      apiKey: '3e1f79662e3759a399997dadff68eec4508109f1754ee56b67274c7840e33c5e'
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
      browsers: [
        'firefox',
        'chrome'
      ]
    }
  },
  name: 'unhaggle-tier3-codecept',
  creds: credentials,
  prod_sites: packageJSON['prod_sites']
}

exports.config = config;

// ============================================================================================================================================== //
// END OF FILE
// ============================================================================================================================================== //
