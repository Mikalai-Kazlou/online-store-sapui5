sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.ProductCatalog", {
    onInit: function () {
      const oModel = this.getOwnerComponent().getModel("products");
      oModel.attachBatchRequestCompleted(null, this._onBatchRequestCompleted.bind(this));
    },

    _onBatchRequestCompleted(oEvent) {
      const oModel = oEvent.getSource();
      const aItems = Object.values(oModel.oData);

      this._configureRangeFilter(this.byId("idFilterPrice"), aItems, "price");
      this._configureRangeFilter(this.byId("idFilterStock"), aItems, "stock");
    },

    _configureRangeFilter(filter, items, property) {
      const min = items.reduce((min, item) => min < item[property] ? min : item[property]);
      const max = items.reduce((max, item) => max > item[property] ? max : item[property]);

      filter.setMin(min);
      filter.setMax(max);
      filter.setRange([min, max]);
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