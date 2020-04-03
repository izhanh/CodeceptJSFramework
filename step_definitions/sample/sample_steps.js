/*
  [SAMPLE] SAMPLE TEST STEPS

  Author : Izhan Hernández
  Date Created : April 1st 2020
*/

// IMPORTS

const { I, sample_sample_test } = inject();

// GHERKIN SENTENCES

Given('user opens Google page', () => {
  sample_sample_test.getURL();
});

Given('user passes the test', () => {
  sample_sample_test.smaplePass();
});

Given('user fails the test', () => {
  sample_sample_test.smapleFail();
});