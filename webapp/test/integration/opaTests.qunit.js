/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
  "use strict";

  sap.ui.require([
    "com/exercise/onlinestoresapui5/test/integration/NavigationJourney"
  ], function () {
    QUnit.start();
  });
});