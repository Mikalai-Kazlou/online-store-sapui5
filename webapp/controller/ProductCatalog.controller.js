sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterType",
  "sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterType, FilterOperator) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.ProductCatalog", {
    onProductCatalogUpdateFinished(oEvent) {
      const oProductCatalog = oEvent.getSource();
      const oBinding = oProductCatalog.getBinding("items");

      const oModel = this.getModel("mockdata");
      const aItems = oBinding.aKeys.map((key) => oModel.getData(`/${key}`));

      this._configureRangeFilter(this.byId("idFilterPrice"), aItems, "Price");
      this._configureRangeFilter(this.byId("idFilterStock"), aItems, "Stock");
    },

    _configureRangeFilter(filter, items, property) {
      if (!filter.getRange()[0]) {
        const min = items.reduce((min, item) => min < item[property] ? min : item[property], Number.MAX_SAFE_INTEGER);
        const max = items.reduce((max, item) => max > item[property] ? max : item[property], 0);

        filter.setMin(min);
        filter.setMax(max);
        filter.setRange([min, max]);
      }
    },

    onOpenDetails: function (oEvent) {
      const oItem = oEvent.getSource();
      this.navTo("details", {
        path: window.encodeURIComponent(oItem.getBindingContext("mockdata").getPath().slice(1))
      });
    },

    onSearch: function (oEvent) {
      const oProductCatalog = this.byId("idProductCatalog");
      const oBinding = oProductCatalog.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== "Title");

      const sQuery = oEvent.getSource().getValue();
      if (sQuery && sQuery.length > 0) {
        aFilters.push(new Filter("Title", FilterOperator.Contains, sQuery));
      }

      oBinding.filter(aFilters, FilterType.Application);
    },

    onFilterCategorySelectionChange: function (oEvent) {
      const oProductCatalog = this.byId("idProductCatalog");
      const oBinding = oProductCatalog.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== "Category");

      const aSelectedItems = oEvent.getSource().getSelectedItems();
      aSelectedItems.forEach((item) => {
        aFilters.push(new Filter("Category", FilterOperator.EQ, item.getTitle()));
      });

      oBinding.filter(aFilters, FilterType.Application);
    },

    onFilterBrandSelectionChange: function (oEvent) {
      const oProductCatalog = this.byId("idProductCatalog");
      const oBinding = oProductCatalog.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== "Brand");

      const aSelectedItems = oEvent.getSource().getSelectedItems();
      aSelectedItems.forEach((item) => {
        aFilters.push(new Filter("Brand", FilterOperator.EQ, item.getTitle()));
      });

      oBinding.filter(aFilters, FilterType.Application);
    },

    onFilterPriceChange: function (oEvent) {
      const oProductCatalog = this.byId("idProductCatalog");
      const oBinding = oProductCatalog.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== "Price");

      const aRange = oEvent.getSource().getRange();
      aFilters.push(new Filter("Price", FilterOperator.BT, aRange[0], aRange[1]));

      oBinding.filter(aFilters, FilterType.Application);
    },

    onFilterStockChange: function (oEvent) {
      const oProductCatalog = this.byId("idProductCatalog");
      const oBinding = oProductCatalog.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== "Stock");

      const aRange = oEvent.getSource().getRange();
      aFilters.push(new Filter("Stock", FilterOperator.BT, aRange[0], aRange[1]));

      oBinding.filter(aFilters, FilterType.Application);
    }
  });

});