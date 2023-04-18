sap.ui.define([
  "./BaseController",
  "sap/m/StandardListItem"
], function (BaseController, StandardListItem) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.Cart", {
    onInit: function () {
      const oRouter = this.getRouter();
      oRouter.getRoute("cart").attachPatternMatched(this._onPatternMatched, this);
    },

    _onPatternMatched: function () {
      const oLocalDataModel = this.getModel("localdata");
      const aCartData = oLocalDataModel.getProperty("/cart");

      const oCartList = this.byId("idCartList");
      oCartList.removeAllItems();

      aCartData.forEach((data) => {
        const oCartListItem = new StandardListItem({
          title: "{mockdata>Title}",
          description: "{mockdata>Brand}",
          icon: "{mockdata>Thumbnail}",
          iconDensityAware: false,
          iconInset: false
        });

        oCartList.addItem(oCartListItem);
        oCartListItem.bindElement({ path: `/ZMK_C_PRODUCT(${data.id})`, model: "mockdata" });
      });
    },
  });

});