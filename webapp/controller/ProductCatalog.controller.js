sap.ui.define([
  "./BaseController"
], function (BaseController) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.ProductCatalog", {
    onOpenDetails: function (oEvent) {
      const oItem = oEvent.getSource();
      this.navTo("details", {
        id: oItem.getBindingContext("products").getPath().split("/").pop()
      });
    }
  });

});