sap.ui.define(["./BaseController","sap/m/MessagePopover","sap/m/MessageItem","sap/m/MessageBox","sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/core/syncStyleClass","sap/ui/core/message/Message","sap/ui/core/MessageType","sap/ui/core/Core","sap/ui/core/Element","../model/constants"],function(e,t,s,a,i,o,n,r,g,c,d,l){"use strict";return e.extend("com.exercise.onlinestoresapui5.controller.Cart",{onInit:function(){const e=new o({name:"",deliveryAddress:"",phoneNumber:"",email:"",cardNumber:"",valid:"",cvv:""});this.requiredFieldsIDs=["idDialogInputName","idDialogInputDeliveryAddress","idDialogInputPhoneNumber","idDialogInputEmail","idDialogInputCardNumber","idDialogInputValid","idDialogInputCVV"];this.constrainedFieldsIDs=["idDialogInputPhoneNumber","idDialogInputEmail","idDialogInputCardNumber","idDialogInputValid","idDialogInputCVV"];this._oMessageManager=c.getMessageManager();this._oMessageManager.removeAllMessages();this.oView=this.getView();this.oView.setModel(e);this.oView.setModel(this._oMessageManager.getMessageModel(),"message");this.oResourceBundle=this.getResourceBundle();const t=this.getRouter();t.getRoute("cart").attachPatternMatched(this._onPatternMatched,this)},_onPatternMatched:function(e){const t=e.getParameter("arguments");const s=t["?query"];if(s&&s.action===l.actions.buyNow){const e=this.byId("idConfirmOrderDialogButton");e.firePress()}},onCartListUpdateFinished:function(){const e=this.byId("idCartList");const t=e.getItems();t.forEach(e=>{const t=e.getBindingContext("localdata").getObject();e.bindElement({path:`/ZMK_C_PRODUCT(${t.id})`,model:"mockdata"})})},onCartListDelete:function(e){const t=e.getParameter("listItem");const s=t.getBindingContext("localdata").getObject();this.oCart.drop(s.id);this._refreshCartModel();this._refreshLocalDataModel()},onOpenConfirmOrderDialog:function(){if(!this.oCart.get().length){i.show(this.oResourceBundle.getText("noProductsInCart"));return}if(!this.oConfirmOrderDialog){this.oConfirmOrderDialog=this.loadFragment({name:"com.exercise.onlinestoresapui5.view.ConfirmOrderDialog"})}this.oConfirmOrderDialog.then(function(e){n(this.getOwnerComponent().getContentDensityClass(),this.getView(),e);this.oDialog=e;this.oDialog.open();this._oMessageManager.registerObject(this.oView.byId("idConfirmOrderContainer"),true);this.createMessagePopover()}.bind(this))},onMessagePopoverPress:function(e){if(!this.oMP){this.createMessagePopover()}this.oMP.toggle(e.getSource())},createMessagePopover:function(){const e=this;this.oMP=new t({activeTitlePress:function(t){const s=t.getParameter("item");const a=e.getView().byId("idCartPage");const i=s.getBindingContext("message").getObject();const o=d.registry.get(i.getControlId());if(o){a.scrollToElement(o.getDomRef(),200,[0,-100]);setTimeout(()=>o.focus(),300);t.getSource().close()}},items:{path:"message>/",template:new s({title:"{message>message}",subtitle:"{message>additionalText}",groupName:{parts:[{path:"message>controlIds"}],formatter:this.getGroupName},activeTitle:{parts:[{path:"message>controlIds"}],formatter:this.isReachable},type:"{message>type}",description:"{message>description}"})},groupItems:true});this.getView().byId("idMessagePopoverButton").addDependent(this.oMP)},getGroupName:function(e){const t=d.registry.get(e[0]);if(t){const e=t.getParent().getParent().getTitle().getText();const s=t.getParent().getParent().getParent().getTitle();return s+" > "+e}},isReachable:function(e){return e?true:true},onDialogInputChange:function(e){const t=e.getSource();if(t.getRequired()){this.handleRequiredField(t)}const s=t.getId();if(this.constrainedFieldsIDs.find(e=>s.includes(e))){this.handleConstrainedField(t)}},handleRequiredField:function(e){const t=e.getBindingPath("value");this.removeMessageFromTarget(t);if(!e.getValue()){const s=e.getLabels()[0].getText();this._oMessageManager.addMessages(new r({message:this.oResourceBundle.getText("requiredFieldMessage",[s]),type:g.Error,additionalText:s,description:this.oResourceBundle.getText("requiredFieldDescription"),target:t,processor:this.getView().getModel()}))}},handleConstrainedField:function(e){const t=e.getBindingPath("value");const s=e.getBinding("value");let a="None";try{s.getType().validateValue(e.getValue())}catch(s){const i=e.getId();a="Warning";const o=new r({type:g.Warning,additionalText:e.getLabels()[0].getText(),description:this.oResourceBundle.getText("constrainedFieldDescription"),target:t,processor:this.getView().getModel()});switch(true){case i.includes("idDialogInputPhoneNumber"):o.setMessage(this.oResourceBundle.getText("validationMessagePhoneNumber"));this._oMessageManager.addMessages(o);break;case i.includes("idDialogInputEmail"):o.setMessage(this.oResourceBundle.getText("validationMessageEmail"));this._oMessageManager.addMessages(o);break;case i.includes("idDialogInputCardNumber"):o.setMessage(this.oResourceBundle.getText("validationMessageCardNumber"));this._oMessageManager.addMessages(o);break;case i.includes("idDialogInputValid"):o.setMessage(this.oResourceBundle.getText("validationMessageValid"));this._oMessageManager.addMessages(o);break;case i.includes("idDialogInputCVV"):o.setMessage(this.oResourceBundle.getText("validationMessageCVV"));this._oMessageManager.addMessages(o);break;default:break}}e.setValueState(a)},removeMessageFromTarget:function(e){this._oMessageManager.getMessageModel().getData().forEach(function(t){if(t.target===e){this._oMessageManager.removeMessages(t)}}.bind(this))},buttonTypeFormatter:function(){let e;const t=this._oMessageManager.getMessageModel().oData;t.forEach(function(t){switch(t.type){case"Error":e="Negative";break;case"Warning":e=e!=="Negative"?"Critical":e;break;case"Success":e=e!=="Negative"&&e!=="Critical"?"Success":e;break;default:e=!e?"Neutral":e;break}});return e},highestSeverityMessages:function(){let e;const t=this.buttonTypeFormatter();switch(t){case"Negative":e="Error";break;case"Critical":e="Warning";break;case"Success":e="Success";break;default:e=!e?"Information":e;break}return this._oMessageManager.getMessageModel().oData.reduce(function(t,s){return s.type===e?++t:t},0)||""},buttonIconFormatter:function(){let e;const t=this._oMessageManager.getMessageModel().oData;t.forEach(function(t){switch(t.type){case"Error":e="sap-icon://error";break;case"Warning":e=e!=="sap-icon://error"?"sap-icon://alert":e;break;case"Success":e="sap-icon://error"&&e!=="sap-icon://alert"?"sap-icon://sys-enter-2":e;break;default:e=!e?"sap-icon://information":e;break}});return e},onConfirmOrder:function(){const e=this.byId("idMessagePopoverButton");e.setVisible(true);this.requiredFieldsIDs.forEach(e=>{const t=this.byId(e);this.handleRequiredField(t)});this.constrainedFieldsIDs.forEach(e=>{const t=this.byId(e);this.handleConstrainedField(t)});this.oMP.getBinding("items").attachChange(function(t){this.oMP.navigateBack();e.setType(this.buttonTypeFormatter());e.setIcon(this.buttonIconFormatter());e.setText(this.highestSeverityMessages())}.bind(this));if(this.oMP.getItems().length){setTimeout(()=>this.oMP.openBy(e),100)}else{a.success(this.oResourceBundle.getText("confirmOrderSuccess"),{title:this.oResourceBundle.getText("cartSummaryConfirmOrderButtonText"),styleClass:this.getOwnerComponent().getContentDensityClass(),onClose:()=>{this.oCart.clear();this._refreshCartModel();this._refreshLocalDataModel();this.navTo("main")}});this.oDialog.close()}},onCancelOrder:function(){this.oDialog.close()}})});
//# sourceMappingURL=Cart.controller.js.map