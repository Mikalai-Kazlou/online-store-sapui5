sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/Device","./Cart","./constants"],function(e,t,n,a,o){"use strict";return{createDeviceModel:()=>{const a=new e(n);a.setDefaultBindingMode(t.OneWay);return a},createLocalDataModel:()=>{const n=new e;n.setJSON(localStorage.getItem(o.localStorageDataID)||JSON.stringify({cart:[]}));n.setDefaultBindingMode(t.TwoWay);return n},createCartModel:()=>{const n=new a;const r=new e({totalQuantity:n.getTotalQuantity(),totalAmount:n.getTotalAmount(),currency:o.currency});r.setDefaultBindingMode(t.TwoWay);return r}}});
//# sourceMappingURL=models.js.map