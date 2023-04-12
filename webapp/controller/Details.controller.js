sap.ui.define([
  "./BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
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
      oBinding.filter(aFilters, "Application");
    },
  });

});