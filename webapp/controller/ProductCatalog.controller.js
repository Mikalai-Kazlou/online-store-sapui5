sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.ProductCatalog", {
    onInit: function () {
      // const oModel = this.getOwnerComponent().getModel("products");
      // oModel.attachRequestCompleted(null, this._onDataCompleated);
    },

    _onDataCompleated(oEvent) {
      const oModel = oEvent.getSource();
      const aItems = oModel.getProperty("/products");
      console.log(aItems);
    },

    onOpenDetails: function (oEvent) {
      const oItem = oEvent.getSource();
      this.navTo("details", {
        id: window.encodeURIComponent(oItem.getBindingContext("products").getPath().slice(1))
      });
    },

    onSearch: function (oEvent) {
      // add filter for search
      const aFilters = [];
      const sQuery = oEvent.getSource().getValue();
      if (sQuery && sQuery.length > 0) {
        aFilters.push(new Filter("title", FilterOperator.Contains, sQuery));
      }
      // update list binding
      const oList = this.byId("idProductCatalog");
      const oBinding = oList.getBinding("items");
      oBinding.filter(aFilters, "Application");
    }
  });

});