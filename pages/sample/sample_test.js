/*
  [SAMPLE] TEST FUNCTIONS

  Author: Izhan Hernández
  Date Created: April 1st 2019
*/

// IMPORT

const { I } = inject();

// CONSTANTS

const sampleUrl = "https://www.google.com";

// TESTS

module.exports = {
  // FUNCTIONS

  getURL() {
    I.amOnPage(sampleUrl);
  },

  // Sample Pass
  smaplePass() {
    I.assert("1", "1");
  },

  // Sample Pass
  smapleFail() {
    I.assert("1", "2");
  },

  // Test setting a config param
  async sampleSetConfigParamTest() {
    I.say("===> Setting config param [random] = 'value'");
    await I.setConfigParamenter("random", "value");
  },

  // Test getting a config param
  async sampleGetConfigParamTest() {
    I.say(`===> Config param [env] = ${await I.getConfigParamenter("env")}`);
    I.say(
      `===> Config param [random] = ${await I.getConfigParamenter("random")}`
    );
  },

  // Test getting a config param
  async sampleSetGlobalVarTest() {
    I.say("===> Setting Global Variable [random] = 'value'");
    await I.setGlobalVar("random", "value");
    await I.setGlobalVar("random2", "value2");
  },

  // Test getting a config param
  async sampleGetGlobalVarTest() {
    I.say(`===> Global Variable [random] = ${await I.getGlobalVar("random")}`);
  },

  // Test generating a mail inbox
  async sampleMailTest() {
    // Generate a mailbox
    const mailBox = await I.haveNewMailbox();
    I.setCurrentMailInbox(mailBox);
    I.say(`New mailbox created: ${await I.getCurrentMailInbox()}`);

    // Send a mail to the recently created inbox
    I.sendEmail({ to: [mailBox.emailAddress], subject: "Test", body: "Email" });

    // Check that the email was received
    I.waitForLatestEmail();
    // Assert we received the mail
    I.seeInEmailSubject("Test");
  },

  getAllBrowserMethods() {
    I.getALlDriverMethods();
  },

  captureLogsTest() {
    I.say(I.grabBrowserLogs());
    //I.saveBrowserLogs();
  },

  changeScreenSizeTest(width, height) {
    I.say(`Changing screen size to: [${width}x${height}]`);
    I.changeScreenSizeTo(width, height);
  },

  changeScreenSizeDeviceTest(device) {
    I.say(`Changing screen size to: [${device}]`);
    I.changeScreenSizeToDevice(device);
  }
};
