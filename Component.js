sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(t,e,s){"use strict";return t.extend("com.exercise.onlinestoresapui5.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.call(this);this.setModel(s.createDeviceModel(),"device");this.setModel(s.createLocalDataModel(),"localdata");this.setModel(s.createCartModel(),"cart");this.getRouter().initialize()},getContentDensityClass:function(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!e.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}})});
//# sourceMappingURL=Component.js.map