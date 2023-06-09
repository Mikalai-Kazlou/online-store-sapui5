sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/ButtonType",
  "../model/constants"
], function (BaseController, Filter, FilterOperator, ButtonType, constants) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.Details", {
    onInit: function () {
      const oRouter = this.getRouter();
      oRouter.getRoute("details").attachPatternMatched(this._onPatternMatched, this);
    },

    onOpenCart: function () {
      this.navTo("cart");
    },

    _onPatternMatched: function (oEvent) {
      const iProductID = +oEvent.getParameter("arguments").id;
      this.getView().bindElement({ path: `/ZMK_C_PRODUCT(${iProductID})`, model: "mockdata" });

      const aFilters = [];
      aFilters.push(new Filter("ProductID", FilterOperator.EQ, iProductID));

      const oMediaGallery = this.byId("idMediaGallery");
      const oBinding = oMediaGallery.getBinding("items");
      oBinding.filter(aFilters);

      const oAddToCartButton = this.byId("idAddToCartButton");
      this._setAddToCartButtonAttributes(iProductID, oAddToCartButton);

      const oQuantityStepInput = this.byId("idQuantityStepInput");
      this._setQuantityStepInputAttributes(iProductID, oQuantityStepInput);
    },

    onAddToCart: function (oEvent) {
      const oButton = oEvent.getSource();

      const oBindingContext = oButton.getBindingContext("mockdata");
      const oItemData = oBindingContext.getObject();

      const oStepInput = this.byId("idQuantityStepInput");

      if (!this.oCart.has(oItemData.ID)) {
        this.oCart.add(oItemData.ID, oStepInput.getValue(), oItemData.Price);
      } else {
        this.oCart.drop(oItemData.ID);
      }

      this._refreshCartModel();
      this._refreshLocalDataModel();

      this._setAddToCartButtonAttributes(oItemData.ID, oButton);
    },

    onBuyNow: function (oEvent) {
      const oButton = oEvent.getSource();

      const oBindingContext = oButton.getBindingContext("mockdata");
      const oItemData = oBindingContext.getObject();

      const oStepInput = this.byId("idQuantityStepInput");

      if (!this.oCart.has(oItemData.ID)) {
        this.oCart.add(oItemData.ID, oStepInput.getValue(), oItemData.Price);
      }

      this._refreshCartModel();
      this._refreshLocalDataModel();

      this.navTo("cart", {
        "?query": {
          action: constants.actions.buyNow
        }
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

    _setQuantityStepInputAttributes: function (id, oStepInput) {
      const oCartItem = this.oCart.has(id);

      if (oCartItem) {
        oStepInput.setValue(oCartItem.q);
      } else {
        oStepInput.setValue(1);
      }
    }
  });

});