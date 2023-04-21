sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/ui/core/routing/History",
  "../model/Cart",
  "../model/constants"
], function (Controller, UIComponent, History, Cart, constants) {
  "use strict";

  return Controller.extend("com.exercise.onlinestoresapui5.controller.BaseController", {
    oCart: new Cart(),

    getOwnerComponent: function () {
      return Controller.prototype.getOwnerComponent.call(this);
    },

    getRouter: function () {
      return UIComponent.getRouterFor(this);
    },

    getResourceBundle: function () {
      const oModel = this.getOwnerComponent().getModel("i18n");
      return oModel.getResourceBundle();
    },

    getModel: function (sName) {
      return this.getView().getModel(sName);
    },

    setModel: function (oModel, sName) {
      this.getView().setModel(oModel, sName);
      return this;
    },

    navTo: function (sName, oParameters, bReplace) {
      this.getRouter().navTo(sName, oParameters, undefined, bReplace);
    },

    onNavBack: function () {
      const sPreviousHash = History.getInstance().getPreviousHash();
      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        this.getRouter().navTo("main", {}, undefined, true);
      }
    },

    onQuantityStepInputChange: function (oEvent) {
      const oStepInput = oEvent.getSource();

      const oBindingContext = oStepInput.getBindingContext("mockdata");
      const oItemData = oBindingContext.getObject();

      this.oCart.replace(oItemData.ID, oStepInput.getValue(), oItemData.Price);

      this._refreshCartModel();
      this._refreshLocalDataModel();
    },

    _refreshLocalDataModel() {
      const oLocalDataModel = this.getModel("localdata");
      oLocalDataModel.setProperty("/cart", this.oCart.get());
      localStorage.setItem(constants.localStorageDataID, oLocalDataModel.getJSON());
    },

    _refreshCartModel() {
      const oCartModel = this.getModel("cart");
      oCartModel.setProperty("/totalQuantity", this.oCart.getTotalQuantity());
      oCartModel.setProperty("/totalAmount", this.oCart.getTotalAmount());
    }
  });

});
