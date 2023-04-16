sap.ui.define([
  "./BaseController"
], function (BaseController) {
  "use strict";

  return BaseController.extend("com.exercise.onlinestoresapui5.controller.Main", {
    onOpenCart: function () {
      this.navTo("cart");
    }
  });

});
