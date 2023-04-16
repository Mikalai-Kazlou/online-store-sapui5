sap.ui.define([
  "sap/ui/test/Opa5",
  "sap/ui/test/actions/Press"
], function (Opa5, Press) {
  "use strict";

  var sViewName = "com.exercise.onlinestoresapui5.view.Main";

  Opa5.createPageObjects({
    onTheMainPage: {
      actions: {
        iPressTheCartButton: function () {
          return this.waitFor({
            id: "goToCartButton",
            viewName: sViewName,
            actions: new Press(),
            errorMessage: "Did not find the 'Cart' button on the Main view"
          });
        }
      },

      assertions: {
        iShouldSeeTheCartPage: function () {
          return this.waitFor({
            controlType: "sap.m.Page",
            success: function () {
              // we set the view busy, so we need to query the parent of the app
              Opa5.assert.ok(true, "The Cart page is open");
            },
            errorMessage: "Did not find the Cart page"
          });
        }
      }
    }
  });
});