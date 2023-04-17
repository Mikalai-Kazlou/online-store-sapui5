sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterType",
  "sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterType, FilterOperator) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.Details", {
    onInit: function () {
      const oRouter = this.getRouter();
      oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);
    },

    onOpenCart: function () {
      this.navTo("cart");
    },

    _onObjectMatched: function (oEvent) {
      const sPath = window.decodeURIComponent(oEvent.getParameter("arguments").path);
      const sProductID = sPath.split("(").pop().slice(0, -1);

      this.getView().bindElement({ path: `/${sPath}`, model: "mockdata" });

      const aFilters = [];
      aFilters.push(new Filter("ProductID", FilterOperator.EQ, sProductID));

      const oMediaGallery = this.byId("idMediaGallery");
      const oBinding = oMediaGallery.getBinding("items");
      oBinding.filter(aFilters, FilterType.Application);
    },

    onAddToCart: function (oEvent) {
      const oButton = oEvent.getSource();

      const oBindingContext = oButton.getBindingContext("mockdata");
      const oModel = oBindingContext.getModel();
      const oItemData = oModel.getData(oBindingContext.getPath());

      const oStepInput = this.byId("idQuantityStepInput");
      this.oCart.add(oItemData.ID, oStepInput.getValue());

      this._refreshCartModel();
      this._refreshLocalDataModel();
    }
  });

});