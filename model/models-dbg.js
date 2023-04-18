sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/BindingMode",
	"sap/ui/Device",
	"./Cart",
	"./constants"
], function (JSONModel, BindingMode, Device, Cart, constants) {
	"use strict";

	return {
		createDeviceModel: () => {
			const oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode(BindingMode.OneWay);
			return oModel;
		},

		createLocalDataModel: () => {
			const oModel = new JSONModel();
			oModel.setJSON(localStorage.getItem(constants.localStorageDataID) || JSON.stringify({ cart: [] }));
			oModel.setDefaultBindingMode(BindingMode.TwoWay);
			return oModel;
		},

		createCartModel: () => {
			const oCart = new Cart();

			const oModel = new JSONModel({
				totalQuantity: oCart.getTotalQuantity()
			});

			oModel.setDefaultBindingMode(BindingMode.TwoWay);
			return oModel;
		},
	};

});
