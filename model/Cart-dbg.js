sap.ui.define([
  "sap/ui/base/Object",
  "./constants"
], function (Object, constants) {
  "use strict";

  return Object.extend("com.exercise.onlinestoresapui5.model.Cart", {
    _cart: [],

    constructor: function () {
      const sLocalData = localStorage.getItem(constants.localStorageDataID);
      if (sLocalData) {
        const oLocalData = JSON.parse(sLocalData);
        if (oLocalData.cart) {
          this._cart = oLocalData.cart;
        }
      }
      return this;
    },

    get: function () {
      return this._cart;
    },

    add: function (id, quantity) {
      const index = this._cart.findIndex((item) => item.id === id);
      if (index >= 0) {
        this._cart[index].q += quantity;
      } else {
        this._cart.push({ id, q: quantity });
      }
    },

    drop: function (id) {
      this._cart = this._cart.filter((item) => item.id !== id);
    },

    replace: function (id, quantity) {
      if (this.has(id)) {
        this.drop(id);
        this.add(id, quantity);
      }
    },

    has: function (id) {
      return this._cart.find((item) => item.id === id);
    },

    getTotalQuantity() {
      return this._cart.reduce((total, item) => total + item.q, 0);
    }
  });

});