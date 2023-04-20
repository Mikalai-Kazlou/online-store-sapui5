sap.ui.define([
  "./BaseController",
  "sap/m/StandardListItem"
], function (BaseController, StandardListItem) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.Cart", {
    onCartListupdateFinished: function () {
      const oCartList = this.byId("idCartList");
      const aCartItems = oCartList.getItems();

      aCartItems.forEach((oCartItem) => {
        const oCartItemData = oCartItem.getBindingContext("localdata").getObject();
        oCartItem.bindElement({ path: `/ZMK_C_PRODUCT(${oCartItemData.id})`, model: "mockdata" });
      });
    }
  });

});