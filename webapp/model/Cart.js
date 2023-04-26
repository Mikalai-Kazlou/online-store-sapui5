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

    clear: function () {
      this._cart = [];
    },

    add: function (id, quantity, price) {
      const index = this._cart.findIndex((item) => item.id === id);
      if (index >= 0) {
        this._cart[index].q += quantity;
      } else {
        this._cart.push({ id, q: quantity, p: price });
      }
    },

    drop: function (id) {
      this._cart = this._cart.filter((item) => item.id !== id);
    },

    replace: function (id, quantity, price) {
      const item = this.has(id);

      if (item) {
        const index = this._cart.indexOf(item);
        this._cart.splice(index, 1, { id, q: quantity, p: price });
      }
    },

    has: function (id) {
      return this._cart.find((item) => item.id === id);
    },

    getTotalQuantity() {
      return this._cart.reduce((total, item) => total + item.q, 0);
    },

    getTotalAmount() {
      return this._cart.reduce((total, item) => total + item.q * item.p, 0);
    }
  });

});