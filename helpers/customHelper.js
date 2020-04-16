/*
  [HELPERS] CUSTOM HELPER

  Author: Tsering Paljor
  Date Created: March 24th 2020
*/

// IMPORTS

const fs = require("fs");
const _ = require("lodash");
const Helper = { codecept_helper };
const methodsFile = "./methods.json";
const globalsFile = "./globals.json";

// HELPERS

class CustomHelper extends Helper.codecept_helper {
  // Change the sceren size
  changeScreenSizeTo(width, height) {
    const browser = this.helpers.WebDriver.browser;
    browser.setWindowSize(width, height);
  }

  // Change the screen size
  changeScreenSizeToDevice(deviceName) {
    const screenDevices = {
      ipad: { width: 768, height: 1024 },
      pixel2: { width: 411, height: 731 },
      iphone5: { width: 320, height: 568 },
      iphone6: { width: 375, height: 667 },
      iphone7: { width: 375, height: 667 },
      iphone8: { width: 375, height: 667 },
      iphoneX: { width: 375, height: 814 },
      pixel2xl: { width: 411, height: 823 },
      galaxyS5: { width: 360, height: 640 },
      ipadPro: { width: 1024, height: 1366 },
      responsive: { width: 400, height: 850 },
      iphone6plus: { width: 414, height: 736 },
      iphone7plus: { width: 414, height: 736 },
      iphone8plus: { width: 414, height: 736 }
    };

    // Check that the device is in the list
    if (deviceName in screenDevices) {
      this.changeScreenSizeTo(
        screenDevices[deviceName].width,
        screenDevices[deviceName].width
      );
    }
  }

  // Save current Browser logs
  saveBrowserLogs() {
    const browser = this.helpers.WebDriver.browser;

    function printLogs(logType) {
      _.forEach(browser.getLogs(logType), function(log) {
        browser.testableLogInfo(
          `[${logType} log] [${log.level}] ${log.message}`
        );
      });
    }

    printLogs("browser");
  }

  // Save current Browser logs
  getALlDriverMethods() {
    const browser = this.helpers.WebDriver.browser;
    const methods = Object.getOwnPropertyNames(browser);
    fs.writeFileSync(methodsFile, JSON.stringify(methods, null, 2));
  }

  // Save the current mail inbox
  setCurrentMailInbox(mailInboxJSON) {
    this.setGlobalVar("current_mailbox", mailInboxJSON);
  }

  // Save the current mail inbox
  getCurrentMailInbox() {
    return this.getGlobalVar("current_mailbox");
  }

  // Set the global params file
  setGlobalVar(param, value) {
    let globals = {};
    try {
      const file = fs.readFileSync(globalsFile, "utf8");
      globals = JSON.parse(file);
    } catch (error) {
      // This means the file does not exist and has to be created
      // This does not catch the undefined value returned by
      globals = {};
    }
    // Set the value
    globals[param] = value;
    // Print the file
    fs.writeFileSync(globalsFile, JSON.stringify(globals, null, 2));
  }

  // Read the global params file and return a value
  getGlobalVar(param) {
    try {
      const file = fs.readFileSync(globalsFile, "utf8");
      const value = JSON.parse(file)[param];
      return value;
    } catch (error) {
      return null;
    }
  }

  // Probably can be deleted since we're using setGlobalVar()
  setConfigParamenter(param, value) {
    const config = require("codeceptjs").config.get();
    config[param] = value;
  }

  // Probably can be deleted since we're using getGlobalVar()
  getConfigParamenter(param) {
    const config = require("codeceptjs").config.get();
    return config[param];
  }

  // Method to drag an item to coordinates
  async dragToPoint(el, x, y) {
    // access browser object from WebDriver
    const browser = this.helpers.WebDriver.browser;
    await this.helpers.WebDriver.moveCursorTo(el);
    if (browser.isW3C) {
      // we use WebDriver protocol
      return browser.performActions([
        { type: "pointerDown", button: 0 },
        { type: "pointerMove", origin: "pointer", duration: 1000, x, y },
        { type: "pointerUp", button: 0 }
      ]);
    }
    // we use JSON Wire protocol
    await browser.buttonDown(0);
    await browser.moveToElement(null, x, y);
    await browser.buttonUp(0);

    return None;
  }

  // Method to drag an item to coordinates
  async getElementLocation(el) {
    // locating an element in WebDriver
    const element = await this.helpers.WebDriver._locate(el);

    return element;
  }

  // method which restarts browser
  async restartBrowser() {
    const browser = this.helpers.WebDriver.browser;
    await browser.reloadSession();
    await browser.maximizeWindow();
  }

  // Method which goes to previous page
  async backToPreviousPage() {
    const browser = this.helpers.WebDriver.browser;
    await browser.back();
  }

  // Generate a random email
  async getTimeStamp() {
    return await Date.now();
  }

  // Generate a random email
  async getRandomEmail() {
    const unixTime = await Math.round(new Date().getTime() / 1000);
    const randomMail = `test_user_${unixTime}@motoinsight.com`;
    return randomMail;
  }

  // Try to click an element, the test do not fail after trying
  tryToClick(elementToClick) {
    try {
      this.helpers.WebDriver.click({ elementToClick });
    } catch (err) {}
  }

  // Try to click an element, the test do not fail after trying
  fillFieldWithRandomMail(elementToFill) {
    try {
      const element = this.helpers.WebDriver.findBy({ elementToFill });
      element.sendKeys(getRandomEmail());
    } catch (err) {}
  }

  // Log out Customer function
  logOutIfVisible() {
    // For some reason, sometimes the user is still logged in despite
    // starting a new session. We therefore need to ensure the user is
    // logged out at the start of every session.
    const logOutLink = '//span[contains(text(), "Log Out")]';
    const helper = this.helpers.WebDriver;
    try {
      helper.click({ logOutLink });
    } catch (err) {}
  }
}

module.exports = CustomHelper;
