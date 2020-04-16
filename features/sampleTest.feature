# [CUSTOMER] BOOK_AN_APPOINTMENT

# Author: Izhan Hernández
# Date Created: April 1st 2020

Feature: Sample Test
    As a Tester I need to have a way to test new framework features.


    Scenario: [@samplTests, @samplPass]
        Given user opens Google page
        When user passes the test

    Scenario: [@samplTests, @samplFail]
        Given user opens Google page
        When user fails the test

    Scenario: [@samplTests, @samplParam]
        Given user opens Google page
        When user tests sample config param

    Scenario: [@samplTests, @samplGlobalVar]
        Given user opens Google page
        When user tests sample global variable

    Scenario: [@samplTests, @samplEmailTest]
        Given user opens Google page
        When user tests sample mail sending and receiving

    Scenario: [@samplTests, @samplGetBrowserMethods]
        Given user opens Google page
        When user prints and saves all available browser methods

    Scenario: [@samplTests, @samplCaptureLogs]
        Given user opens Google page
        When user tests capturing logs of the browser

    Scenario: [@samplTests, @samplResponsiveness]
        Given user opens Google page
        When user changes the size of the screen to "responsive"
        Then user waits 3 seconds
        And user changes the size of the screen to "ipad"
        Then user waits 3 seconds
        And user changes the size of the screen to "iphone8"
        Then user waits 3 seconds
        And user changes the size of the screen to 768 x 1024
        Then user waits 3 seconds
