/*global QUnit*/

sap.ui.define([
  "com/exercise/onlinestoresapui5/model/formatter",
  "sap/ui/model/resource/ResourceModel"
], function (formatter, ResourceModel) {
  "use strict";

  QUnit.module("Formatting functions", {
    beforeEach: function () {
      this._oResourceModel = new ResourceModel({
        bundleUrl: sap.ui.require.toUrl("com/exercise/onlinestoresapui5") + "/i18n/i18n.properties"
      });
    },

    afterEach: function () {
      this._oResourceModel.destroy();
    }
  });

  QUnit.test("Should return the formatted values", function (assert) {
    // Arrange
    // this.stub() does not support chaining and always returns the right data
    // even if a wrong or empty parameter is passed.
    var oModel = this.stub();
    oModel.withArgs("i18n").returns(this._oResourceModel);

    var oViewStub = {
      getModel: oModel
    };
    var oControllerStub = {
      getOwnerComponent: this.stub().returns(oViewStub)
    };

    // System under test
    var fnIsolatedFormatter = formatter.formatValue.bind(oControllerStub);

    // Assert
    assert.strictEqual(fnIsolatedFormatter(1.45678), "1.46", "The value was formatted correctly (1.45678 => 1.46)");
    assert.strictEqual(fnIsolatedFormatter(5.71256), "5.71", "The value was formatted correctly (5.71256 => 5.71)");
    assert.strictEqual(fnIsolatedFormatter(7.3), "7.30", "The value was formatted correctly (7.3 => 7.30)");
  });

});