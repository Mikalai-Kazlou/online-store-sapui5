sap.ui.define([
  "./BaseController",
  "sap/ui/core/syncStyleClass"
], function (BaseController, syncStyleClass) {
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
    },

    onOpenConfirmOrderDialog: function () {
      if (!this.oConfirmOrderDialog) {
        this.oConfirmOrderDialog = this.loadFragment({
          name: "com.exercise.onlinestoresapui5.view.ConfirmOrderDialog"
        });
      }

      this.oConfirmOrderDialog.then(function (oDialog) {
        syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);

        this.oDialog = oDialog;
        this.oDialog.open();

        // this._oMessageManager.registerObject(this.oView.byId("formContainer"), true);
        // this.createMessagePopover();
      }.bind(this));
    },

    onConfirmOrder: function () {
      this.oDialog.close();
    },

    onCancelOrder: function () {
      this.oDialog.close();
    }
  });

});