sap.ui.define([
  "./BaseController"
], function (BaseController) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.Cart", {
    onCartListUpdateFinished: function () {
      const oCartList = this.byId("idCartList");
      const aCartItems = oCartList.getItems();

      aCartItems.forEach((oCartItem) => {
        const oCartItemData = oCartItem.getBindingContext("localdata").getObject();
        oCartItem.bindElement({ path: `/ZMK_C_PRODUCT(${oCartItemData.id})`, model: "mockdata" });
      });
    },

    onCartListDelete: function (oEvent) {
      const oCartItem = oEvent.getParameter("listItem");
      const oCartItemData = oCartItem.getBindingContext("localdata").getObject();

      this.oCart.drop(oCartItemData.id);

      this._refreshCartModel();
      this._refreshLocalDataModel();
    }
  });

});