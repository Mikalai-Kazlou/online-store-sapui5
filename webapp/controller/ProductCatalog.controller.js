sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterType",
  "sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterType, FilterOperator) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.ProductCatalog", {
    onInit: function () {
      const oModel = this.getOwnerComponent().getModel("mockdata");
      oModel.attachBatchRequestCompleted(this._onBatchRequestCompleted.bind(this));
    },

    _onBatchRequestCompleted(oEvent) {
      const oModel = oEvent.getSource();
      const aItems = Object.values(oModel.oData);

      this._configureRangeFilter(this.byId("idFilterPrice"), aItems, "Price");
      this._configureRangeFilter(this.byId("idFilterStock"), aItems, "Stock");
    },

    _configureRangeFilter(filter, items, property) {
      const min = items.reduce((min, item) => min < item[property] ? min : item[property], Number.MAX_SAFE_INTEGER);
      const max = items.reduce((max, item) => max > item[property] ? max : item[property], 0);

      filter.setMin(min);
      filter.setMax(max);
      filter.setRange([min, max]);
    },

    onOpenDetails: function (oEvent) {
      const oItem = oEvent.getSource();
      this.navTo("details", {
        path: window.encodeURIComponent(oItem.getBindingContext("mockdata").getPath().slice(1))
      });
    },

    onSearch: function (oEvent) {
      const oList = this.byId("idProductCatalog");
      const oBinding = oList.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== "Title");

      const sQuery = oEvent.getSource().getValue();
      if (sQuery && sQuery.length > 0) {
        aFilters.push(new Filter("Title", FilterOperator.Contains, sQuery));
      }

      oBinding.filter(aFilters, FilterType.Application);
    },

    onFilterCategorySelectionChange: function (oEvent) {
      const oList = this.byId("idProductCatalog");
      const oBinding = oList.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== "Category");

      const aSelectedItems = oEvent.getSource().getSelectedItems();
      aSelectedItems.forEach((item) => {
        aFilters.push(new Filter("Category", FilterOperator.EQ, item.getTitle()));
      });

      oBinding.filter(aFilters, FilterType.Application);
    },

    onFilterBrandSelectionChange: function (oEvent) {
      const oList = this.byId("idProductCatalog");
      const oBinding = oList.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== "Brand");

      const aSelectedItems = oEvent.getSource().getSelectedItems();
      aSelectedItems.forEach((item) => {
        aFilters.push(new Filter("Brand", FilterOperator.EQ, item.getTitle()));
      });

      oBinding.filter(aFilters, FilterType.Application);
    }
  });

});