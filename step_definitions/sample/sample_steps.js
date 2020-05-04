/*
  [SAMPLE] SAMPLE TEST STEPS

  Author : Izhan Hernández
  Date Created : April 1st 2020
*/

// IMPORTS

const { sample_sample_test } = inject();

// GHERKIN SENTENCES

Given("user opens Google page", () => {
  sample_sample_test.getURL();
});

Given("user passes the test", () => {
  sample_sample_test.smaplePass();
});

Given("user fails the test", () => {
  sample_sample_test.smapleFail();
});

Given("user waits {int} seconds", integ => {
  I.wait(integ);
});

Given("user tests sample config param", () => {
  sample_sample_test.sampleSetConfigParamTest();
  sample_sample_test.sampleGetConfigParamTest();
});

Given("user tests sample global variable", () => {
  sample_sample_test.sampleSetGlobalVarTest();
  sample_sample_test.sampleGetGlobalVarTest();
});

Given("user tests sample mail sending and receiving", () => {
  sample_sample_test.sampleMailTest();
});

Given("user tests capturing logs of the browser", () => {
  sample_sample_test.captureLogsTest();
});

Given("user prints and saves all available browser methods", () => {
  sample_sample_test.getAllBrowserMethods();
});

Given("user changes the size of the screen to {string}", device => {
  sample_sample_test.changeScreenSizeDeviceTest(device);
});

Given(
  "user changes the size of the screen to {int} x {int}",
  (width, height) => {
    sample_sample_test.changeScreenSizeTest(width, height);
  }
);