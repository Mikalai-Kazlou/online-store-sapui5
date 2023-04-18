sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterType",
  "sap/ui/model/FilterOperator",
  "sap/m/ButtonType"
], function (BaseController, Filter, FilterType, FilterOperator, ButtonType) {
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

      const oModel = oBinding.getModel();
      const aItems = oBinding.aKeys.map((key) => oModel.getData(`/${key}`));

      this._configureRangeFilter(this.byId("idFilterPrice"), aItems, "Price");
      this._configureRangeFilter(this.byId("idFilterStock"), aItems, "Stock");

      const oItems = oProductCatalog.getItems();
      oItems.forEach((item) => {
        const oItemData = item.getBindingContext("mockdata").getObject();
        const oAddToCartButton = item.getContent()[0].getControlsByFieldGroupId("idAddToCartButtonGroup")[0];
        this._setAddToCartButtonAttributes(oItemData.ID, oAddToCartButton);
      });
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

      const oBindingContext = oButton.getBindingContext("mockdata");
      const oModel = oBindingContext.getModel();
      const oItemData = oModel.getData(oBindingContext.getPath());

      if (!this.oCart.has(oItemData.ID)) {
        this.oCart.add(oItemData.ID, 1);
      } else {
        this.oCart.drop(oItemData.ID);
      }

      this._refreshCartModel();
      this._refreshLocalDataModel();

      this._setAddToCartButtonAttributes(oItemData.ID, oButton);
    },

    _setAddToCartButtonAttributes: function (id, oButton) {
      const oBundle = this.getResourceBundle();

      if (this.oCart.has(id)) {
        oButton.setType(ButtonType.Success);
        oButton.setText(oBundle.getText("productCatalogDropFromCartButtonText"));
      } else {
        oButton.setType(ButtonType.Default);
        oButton.setText(oBundle.getText("productCatalogAddToCartButtonText"));
      }
    }
  });

});