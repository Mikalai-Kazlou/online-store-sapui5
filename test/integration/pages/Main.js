sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/actions/Press"],function(e,t){"use strict";var i="com.exercise.onlinestoresapui5.view.Main";e.createPageObjects({onTheMainPage:{actions:{iPressTheCartButton:function(){return this.waitFor({id:"goToCartButton",viewName:i,actions:new t,errorMessage:"Did not find the 'Cart' button on the Main view"})}},assertions:{iShouldSeeTheCartPage:function(){return this.waitFor({controlType:"sap.m.Page",success:function(){e.assert.ok(true,"The Cart page is open")},errorMessage:"Did not find the Cart page"})}}}})});
//# sourceMappingURL=Main.js.map