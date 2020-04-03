/*
  [SAMPLE] TEST FUNCTIONS

  Author: Izhan Hernández
  Date Created: April 1st 2019
*/

// IMPORT

const { I } = inject();

// CONSTANTS

sampleUrl = 'https://www.google.com';

// TESTS

module.exports = {

  // FUNCTIONS

  getURL(){
    I.amOnPage(sampleUrl);
  },

  // Sample Pass
  smaplePass(){
    I.assert('1', '1');
  },

  // Sample Pass
  smapleFail(){
    I.assert('1', '2');
  }
}
