sap.ui.define(["./BaseController"],function(t){"use strict";return t.extend("com.exercise.onlinestoresapui5.controller.Cart",{onCartListUpdateFinished:function(){const t=this.byId("idCartList");const e=t.getItems();e.forEach(t=>{const e=t.getBindingContext("localdata").getObject();t.bindElement({path:`/ZMK_C_PRODUCT(${e.id})`,model:"mockdata"})})},onCartListDelete:function(t){const e=t.getParameter("listItem");const n=e.getBindingContext("localdata").getObject();this.oCart.drop(n.id);this._refreshCartModel();this._refreshLocalDataModel()}})});
//# sourceMappingURL=Cart.controller.js.map