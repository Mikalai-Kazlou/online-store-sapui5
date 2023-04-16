sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterType",
  "sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterType, FilterOperator) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.ProductCatalog", {
    onOpenDetails: function (oEvent) {
      const oButton = oEvent.getSource();
      this.navTo("details", {
        path: window.encodeURIComponent(oButton.getBindingContext("mockdata").getPath().slice(1))
      });
    },

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

    _applyFilters: function (filters, field) {
      const oProductCatalog = this.byId("idProductCatalog");
      const oBinding = oProductCatalog.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== field);
      aFilters = [...aFilters, ...filters];

      oBinding.filter(aFilters, FilterType.Application);
    },

    _applyListFilter: function (oEvent, field) {
      const aFilters = [];

      const aSelectedItems = oEvent.getSource().getSelectedItems();
      aSelectedItems.forEach((item) => {
        aFilters.push(new Filter(field, FilterOperator.EQ, item.getTitle()));
      });

      this._applyFilters(aFilters, field);
    },

    _applyRangeFilter: function (oEvent, field) {
      const aFilters = [];

      const aRange = oEvent.getSource().getRange();
      aFilters.push(new Filter(field, FilterOperator.BT, aRange[0], aRange[1]));

      this._applyFilters(aFilters, field);
    },

    onSearch: function (oEvent) {
      const aFilters = [];

      const sQuery = oEvent.getSource().getValue();
      if (sQuery && sQuery.length > 0) {
        aFilters.push(new Filter("Title", FilterOperator.Contains, sQuery));
      }

      this._applyFilters(aFilters, "Title");
    },

    onFilterCategorySelectionChange: function (oEvent) {
      this._applyListFilter(oEvent, "Category");
    },

    onFilterBrandSelectionChange: function (oEvent) {
      this._applyListFilter(oEvent, "Brand");
    },

    onFilterPriceChange: function (oEvent) {
      this._applyRangeFilter(oEvent, "Price");
    },

    onFilterStockChange: function (oEvent) {
      this._applyRangeFilter(oEvent, "Stock");
    },

    onAddToCart: function (oEvent) {
      const oButton = oEvent.getSource();

      const oModel = this.getModel("mockdata");
      const oItemData = oModel.getData(oButton.getBindingContext("mockdata").getPath());

      const oLocalDataModel = this.getModel("localdata");
      const oCart = oLocalDataModel.getProperty("/cart");
      oCart.push({ id: oItemData.ID, qnt: 1 });

      localStorage.setItem("online-store-sapui5-localdata", oLocalDataModel.getJSON());
    }
  });

});