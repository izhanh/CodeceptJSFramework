/*
  [HELPERS] CUSTOM HELPER

  Author: Izhan Hernández
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
}

module.exports = CustomHelper;
