sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/BindingMode",
	"sap/ui/Device"
], function (JSONModel, BindingMode, Device) {
	"use strict";

	return {
		createDeviceModel: () => {
			const oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode(BindingMode.OneWay);
			return oModel;
		},

		createConstantModel: () => {
			const oModel = new JSONModel({
				currency: "USD"
			});
			oModel.setDefaultBindingMode(BindingMode.OneWay);
			return oModel;
		},

		createLocalDataModel: () => {
			const oModel = new JSONModel();
			oModel.setJSON(localStorage.getItem("online-store-sapui5-localdata") || JSON.stringify({ cart: [] }));
			oModel.setDefaultBindingMode(BindingMode.TwoWay);
			return oModel;
		}
	};

});
