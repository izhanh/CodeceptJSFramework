/*
  [HELPERS] CUSTOM HELPER

  Author: Tsering Paljor
  Date Created: March 24th 2020
*/

// IMPORTS

const Helper = codecept_helper;

// HELPERS

class CustomHelper extends Helper {

  // Function to reset the browser between tests
  restartBrowser() {
    console.log("Resetting browser for new test");
    let client = this.helpers['WebDriver'].browser;
    client.restart();
  }

  // Generate a random email
  async getTimeStamp() {
    return Date.now();
  }

  // Generate a random email
  async getRandomEmail() {
    let unixTime = await Math.round(new Date().getTime()/1000);
    let randomMail = "test_user_" + unixTime + "@motoinsight.com";
    console.log("New random mail generated: " + randomMail);
    return randomMail;
  }

  // Try to click an element, the test do not fail after trying
  async tryToClick(elementToClick) {
    try {
      this.helpers['WebDriver'].click({elementToClick});
    } catch (err) {}
  }

  // Try to click an element, the test do not fail after trying
  async fillFieldWithRandomMail(elementToFill) {
    try {
      var element = this.helpers['WebDriver'].findBy({elementToFill});
      element.sendKeys(getRandomEmail());
    } catch (err) {
      console.log(err);
    }
  }

  // Log out Customer function
  async logOutIfVisible() {
    // For some reason, sometimes the user is still logged in despite 
    // starting a new session. We therefore need to ensure the user is
    // logged out at the start of every session.
    const logOutLink = '//span[contains(text(), "Log Out")]';
    let helper = this.helpers['WebDriver'];
    try {
      helper.click({logOutLink});
      console.log('Logging out.');
    } catch (err) {
      console.log('Already logged out.');
    }
  }
}

module.exports = CustomHelper;
