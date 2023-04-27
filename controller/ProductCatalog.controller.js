sap.ui.define(["./BaseController","sap/ui/model/Filter","sap/ui/model/FilterType","sap/ui/model/FilterOperator","sap/m/ButtonType"],function(t,e,i,n,o){"use strict";return t.extend("com.exercise.onlinestoresapui5.controller.ProductCatalog",{onInit:function(){const t=this.getRouter();t.getRoute("main").attachPatternMatched(this._onPatternMatched,this)},_onPatternMatched:function(){const t=this.byId("idProductCatalog");const e=t.getItems();this._setAddToCartButtonsAttributes(e)},onOpenDetails:function(t){const e=t.getSource();this.navTo("details",{id:e.getBindingContext("mockdata").getObject().ID})},onProductCatalogUpdateFinished(t){const e=t.getSource();const i=e.getItems();const n=i.map(t=>t.getBindingContext("mockdata").getObject());this._setRangeFilterAttributes(this.byId("idFilterPrice"),n,"Price");this._setRangeFilterAttributes(this.byId("idFilterStock"),n,"Stock");this._setAddToCartButtonsAttributes(i)},_setAddToCartButtonsAttributes:function(t){t.forEach(t=>{const e=t.getBindingContext("mockdata").getObject();const i=t.getContent()[0].getControlsByFieldGroupId("idAddToCartButtonGroup")[0];this._setAddToCartButtonAttributes(e.ID,i)})},_setAddToCartButtonAttributes:function(t,e){const i=this.getResourceBundle();if(this.oCart.has(t)){e.setType(o.Success);e.setText(i.getText("productCatalogDropFromCartButtonText"))}else{e.setType(o.Default);e.setText(i.getText("productCatalogAddToCartButtonText"))}},_setRangeFilterAttributes(t,e,i){if(!t.getRange()[0]){const n=e.reduce((t,e)=>t<e[i]?t:e[i],Number.MAX_SAFE_INTEGER);const o=e.reduce((t,e)=>t>e[i]?t:e[i],0);t.setMin(n);t.setMax(o);t.setRange([n,o])}},_applyFilters:function(t,e){const n=this.byId("idProductCatalog");const o=n.getBinding("items");let s=o.getFilters(i.Application);s=s.filter(t=>t.getPath()!==e);s=s.concat(...t);o.filter(s,i.Application)},_applyTextFilter:function(t,i){const o=[];const s=t.getValue();if(s&&s.length>0){o.push(new e(i,n.Contains,s))}this._applyFilters(o,i)},_applyListFilter:function(t,i){const o=[];const s=t.getSelectedItems();s.forEach(t=>{o.push(new e(i,n.EQ,t.getTitle()))});this._applyFilters(o,i)},_applyRangeFilter:function(t,i){const o=[];const[s,r]=t.getRange().sort((t,e)=>t-e);o.push(new e(i,n.BT,s,r));this._applyFilters(o,i)},onClearFilters:function(){const t=this.byId("idFilterSearch");t.setValue("");this._applyTextFilter(t,"Title");const e=this.byId("idFilterCategory");e.removeSelections(true);this._applyListFilter(e,"Category");const i=this.byId("idFilterBrand");i.removeSelections(true);this._applyListFilter(i,"Brand");const n=this.byId("idFilterPrice");n.setRange([n.getMin(),n.getMax()]);this._applyRangeFilter(n,"Price");const o=this.byId("idFilterStock");o.setRange([o.getMin(),o.getMax()]);this._applyRangeFilter(o,"Stock")},onSearch:function(t){this._applyTextFilter(t.getSource(),"Title")},onFilterCategorySelectionChange:function(t){this._applyListFilter(t.getSource(),"Category")},onFilterBrandSelectionChange:function(t){this._applyListFilter(t.getSource(),"Brand")},onFilterPriceChange:function(t){this._applyRangeFilter(t.getSource(),"Price")},onFilterStockChange:function(t){this._applyRangeFilter(t.getSource(),"Stock")},onAddToCart:function(t){const e=t.getSource();const i=e.getBindingContext("mockdata");const n=i.getObject();if(!this.oCart.has(n.ID)){this.oCart.add(n.ID,1,n.Price)}else{this.oCart.drop(n.ID)}this._refreshCartModel();this._refreshLocalDataModel();this._setAddToCartButtonAttributes(n.ID,e)},onFilterPanelExpand:function(t){const e=t.getParameters();const i=this.byId("idFiltersTitle");i.setVisible(e.expand);const n=this.byId("idFiltersClearButton");n.setVisible(e.expand)}})});
//# sourceMappingURL=ProductCatalog.controller.js.map