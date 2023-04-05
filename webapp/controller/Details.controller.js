sap.ui.define([
  "./BaseController"
], function (BaseController) {
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
      this.getView().bindElement({
        path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").id),
        model: "products"
      });
    },
  });

});