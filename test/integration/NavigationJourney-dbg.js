/*global QUnit, opaTest*/

sap.ui.define([
  "com/exercise/onlinestoresapui5/localService/mockserver",
  "sap/ui/test/opaQunit",
  "./pages/Main"
], function (mockserver) {
  "use strict";

  QUnit.module("Navigation");

  opaTest("Should open the Cart page", function (Given, When, Then) {
    // initialize the mock server
    mockserver.init();

    // Arrangements
    Given.iStartMyUIComponent({
      componentConfig: {
        name: "com.exercise.onlinestoresapui5"
      }
    });

    //Actions
    When.onTheMainPage.iPressTheCartButton();

    // Assertions
    Then.onTheMainPage.iShouldSeeTheCartPage();

    // Cleanup
    Then.iTeardownMyApp();
  });
});