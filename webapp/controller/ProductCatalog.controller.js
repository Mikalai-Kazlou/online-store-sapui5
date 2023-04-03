sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.ProductCatalog", {
    onInit: function () {
      var oViewModel = new JSONModel({
        currency: "EUR"
      });
      this.getView().setModel(oViewModel, "view");
    },

    onOpenDetails: function (oEvent) {
      const oItem = oEvent.getSource();
      this.navTo("details", {
        id: window.encodeURIComponent(oItem.getBindingContext("products").getPath().slice(1))
      });
    }
  });

});