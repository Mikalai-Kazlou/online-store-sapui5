sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterType",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter",
  "sap/ui/model/ChangeReason",
  "sap/ui/layout/cssgrid/GridBoxLayout",
  "sap/m/ButtonType"
], function (BaseController, Filter, FilterType, FilterOperator, Sorter, ChangeReason, GridBoxLayout, ButtonType) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.ProductCatalog", {
    onInit: function () {
      const oRouter = this.getRouter();
      oRouter.getRoute("main").attachPatternMatched(this._onPatternMatched, this);
    },

    _onPatternMatched: function () {
      const oProductCatalog = this.byId("idProductCatalog");
      const aItems = oProductCatalog.getItems();

      this._setAddToCartButtonsAttributes(aItems);
    },

    createProductCatalogListContent: function (sId) {
      const oListViewSelector = this.byId("idListViewSelector");

      let sListItemId = "idListItemLarge";
      let oLayoutSettings = { boxMinWidth: "22rem" };

      if (oListViewSelector.getSelectedKey() === "list") {
        sListItemId = "idListItemSmall";
        oLayoutSettings = { boxMinWidth: "100%" };
      }

      const oUIControl = this.byId(sListItemId).clone(sId);
      const oLayout = new GridBoxLayout(oLayoutSettings);

      const oList = this.byId("idProductCatalog");
      oList.setCustomLayout(oLayout);

      return oUIControl;
    },

    onListViewSelectorChange: function (oEvent) {
      const oList = this.byId("idProductCatalog");

      const oBinding = oList.getBinding("items");
      oBinding.refresh(true);

      oList.updateAggregation("items", ChangeReason.Refresh);
    },

    onOpenDetails: function (oEvent) {
      const oButton = oEvent.getSource();
      this.navTo("details", {
        id: oButton.getBindingContext("mockdata").getObject().ID
      });
    },

    onProductCatalogUpdateFinished(oEvent) {
      const oProductCatalog = oEvent.getSource();
      const aItems = oProductCatalog.getItems();

      const aItemsData = aItems.map((item) => item.getBindingContext("mockdata").getObject());

      this._setRangeFilterAttributes(this.byId("idFilterPrice"), aItemsData, "Price");
      this._setRangeFilterAttributes(this.byId("idFilterStock"), aItemsData, "Stock");

      this._setAddToCartButtonsAttributes(aItems);
    },

    _setAddToCartButtonsAttributes: function (items) {
      items.forEach((item) => {
        const oItemData = item.getBindingContext("mockdata").getObject();
        const oAddToCartButton = item.getContent()[0].getControlsByFieldGroupId("idAddToCartButtonGroup")[0];
        this._setAddToCartButtonAttributes(oItemData.ID, oAddToCartButton);
      });
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
    },

    _setRangeFilterAttributes: function (filter, items, property) {
      if (!filter.getRange()[0]) {
        const min = items.reduce((min, item) => min < item[property] ? min : item[property], Number.MAX_SAFE_INTEGER);
        const max = items.reduce((max, item) => max > item[property] ? max : item[property], 0);

        filter.setMin(min);
        filter.setMax(max);
        filter.setRange([min, max]);
      }
    },

    onSortingChange: function (oEvent) {
      const oSource = oEvent.getSource();
      const sSortingKey = oSource.getSelectedKey();
      const [sProperty, sDirection] = sSortingKey.split("-");

      const oProductCatalog = this.byId("idProductCatalog");
      const oBinding = oProductCatalog.getBinding("items");
      oBinding.sort([new Sorter(sProperty, Boolean(sDirection))]);
    },

    _applyFilters: function (filters, property) {
      const oProductCatalog = this.byId("idProductCatalog");
      const oBinding = oProductCatalog.getBinding("items");

      let aFilters = oBinding.getFilters(FilterType.Application);
      aFilters = aFilters.filter((item) => item.getPath() !== property);
      aFilters = aFilters.concat(...filters);

      oBinding.filter(aFilters, FilterType.Application);
    },

    _applyTextFilter: function (oSource, property) {
      const aFilters = [];

      const sQuery = oSource.getValue();
      if (sQuery && sQuery.length > 0) {
        aFilters.push(new Filter(property, FilterOperator.Contains, sQuery));
      }

      this._applyFilters(aFilters, property);
    },

    _applyListFilter: function (oSource, property) {
      const aFilters = [];

      const aSelectedItems = oSource.getSelectedItems();
      aSelectedItems.forEach((item) => {
        aFilters.push(new Filter(property, FilterOperator.EQ, item.getTitle()));
      });

      this._applyFilters(aFilters, property);
    },

    _applyRangeFilter: function (oSource, property) {
      const aFilters = [];

      const [min, max] = oSource.getRange().sort((a, b) => a - b);
      if (min !== oSource.getMin() || max !== oSource.getMax()) {
        aFilters.push(new Filter(property, FilterOperator.BT, min, max));
      }

      this._applyFilters(aFilters, property);
    },

    onClearFilters: function () {
      const oFilterSearch = this.byId("idFilterSearch");
      oFilterSearch.setValue("");
      this._applyTextFilter(oFilterSearch, "Title");

      const oFilterCategory = this.byId("idFilterCategory");
      oFilterCategory.removeSelections(true);
      this._applyListFilter(oFilterCategory, "Category");

      const oFilterBrand = this.byId("idFilterBrand");
      oFilterBrand.removeSelections(true);
      this._applyListFilter(oFilterBrand, "Brand");

      const oFilterPrice = this.byId("idFilterPrice");
      oFilterPrice.setRange([oFilterPrice.getMin(), oFilterPrice.getMax()]);
      this._applyRangeFilter(oFilterPrice, "Price");

      const oFilterStock = this.byId("idFilterStock");
      oFilterStock.setRange([oFilterStock.getMin(), oFilterStock.getMax()]);
      this._applyRangeFilter(oFilterStock, "Stock");
    },

    onSearch: function (oEvent) {
      this._applyTextFilter(oEvent.getSource(), "Title");
    },

    onFilterCategorySelectionChange: function (oEvent) {
      this._applyListFilter(oEvent.getSource(), "Category");
    },

    onFilterBrandSelectionChange: function (oEvent) {
      this._applyListFilter(oEvent.getSource(), "Brand");
    },

    onFilterPriceChange: function (oEvent) {
      this._applyRangeFilter(oEvent.getSource(), "Price");
    },

    onFilterStockChange: function (oEvent) {
      this._applyRangeFilter(oEvent.getSource(), "Stock");
    },

    onAddToCart: function (oEvent) {
      const oButton = oEvent.getSource();

      const oBindingContext = oButton.getBindingContext("mockdata");
      const oItemData = oBindingContext.getObject();

      if (!this.oCart.has(oItemData.ID)) {
        this.oCart.add(oItemData.ID, 1, oItemData.Price);
      } else {
        this.oCart.drop(oItemData.ID);
      }

      this._refreshCartModel();
      this._refreshLocalDataModel();

      this._setAddToCartButtonAttributes(oItemData.ID, oButton);
    },

    onFilterPanelExpand: function (oEvent) {
      const oParameters = oEvent.getParameters();

      const oFiltersTitle = this.byId("idFiltersTitle");
      oFiltersTitle.setVisible(oParameters.expand);

      const oFiltersClearButton = this.byId("idFiltersClearButton");
      oFiltersClearButton.setVisible(oParameters.expand);
    }
  });

});