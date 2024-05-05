sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("com.manish.manageproduct.controller.View1", {
            onInit: function () {
            //  const that=this
            //  const oDataV2Model =  this.getOwnerComponent().getModel()
            //  oDataV2Model.read('/Products', {
            //     success: function(odata, oResponse) {
            //         console.log('Data from service:', odata);
            //         for(let i=0; i<odata.length; i++)
            //         {
            //          let pid=odata.results[i].ProductID ;
            //         oDataV2Model.read("/Products("+pid+")/Supplier",{
            //             success:function(data,oResponse){
            //                 console.log("here is my first supplier ", data)
            //             },
            //             error:function(error){

            //             }
            //         })
            //     }
            //         const oModel = new JSONModel(); 
            //         oModel.setData(odata.results); 
            //         that.getView().byId("idProductsTable").setModel(oModel, "P") 
            //         that.getView().byId("idProductsTable2").setModel(oModel, "P")
            //         that.getView().byId("idProductsTable3").setModel(oModel, "P")
            //         that.getView().byId("idProductsTable4").setModel(oModel, "P");

            //     },
            //     error: function(oError) {
            //         console.log('Error in service call', oError)

            //     } 
            // }) 
            },
 
            onPress:function(oEvent) {
                var pId= oEvent.getSource().getBindingContext().getProperty("ProductID")
                var oRouter = this.getOwnerComponent().getRouter();
                // var index= oEvent.getSource().getBindingContext('P').sPath.split('/')[1]
                // var pId=oEvent.getSource().getModel('P').getData()[0].ProductID
                oRouter.navTo("category", {pId: pId});
            },

            _handleReorderActionResult : function (sProductId, bSuccess, iRequestNumber, iTotalRequests){
                // we could create a counter for successful and one for failed requests
                // however, we just assume that every single request was successful and display a success message once
                if (iRequestNumber === iTotalRequests) {
                   // MessageToast.show(this.getModel("i18n").getResourceBundle().getText("StockUpdatedSuccessMsg", [iTotalRequests]));
                   sap.m.MessageToast.show(`Stock updated with ${iTotalRequests}`)
                }
            },

            _handleUnlistActionResult : function (sProductId, bSuccess, iRequestNumber, iTotalRequests){
                // we could create a counter for successful and one for failed requests
                // however, we just assume that every single request was successful and display a success message once
                if (iRequestNumber === iTotalRequests) {
                    sap.m.MessageToast.show(`Stock Removed Successfully ${iTotalRequests}`)
                }
            },
    

            onOrder: function() {
                var aSelectedProducts, i, sPath, oProductObject;
    
                aSelectedProducts = this.byId("idAllProductsTable").getSelectedItems();
                if (aSelectedProducts.length) {
                    for (i = 0; i < aSelectedProducts.length; i++) {
                        sPath = aSelectedProducts[i].getBindingContext().getPath();
                        oProductObject = aSelectedProducts[i].getBindingContext().getObject();
                        oProductObject.UnitsInStock += 10;
                        const oModel = this.getOwnerComponent().getModel();
                        oModel.update(sPath, oProductObject, {
                            success : this._handleReorderActionResult.bind(this, oProductObject.ProductID, true, i + 1, aSelectedProducts.length),
                            error : this._handleReorderActionResult.bind(this, oProductObject.ProductID, false, i + 1, aSelectedProducts.length)
                        });
                    }
                } else {

                   // this._showErrorMessage(this.getModel("i18n").getResourceBundle().getText("TableSelectProduct"));
                   sap.m.MessageToast.show("Error in updatign stock!")


                }
            },

            onRemove: function() {
                var aSelectedProducts, i, sPath, oProduct, oProductId;
    
                aSelectedProducts = this.byId("idAllProductsTable").getSelectedItems();
                if (aSelectedProducts.length) {
                    for (i = 0; i < aSelectedProducts.length; i++) {
                        oProduct = aSelectedProducts[i];
                        oProductId = oProduct.getBindingContext().getProperty("ProductID");
                        sPath = oProduct.getBindingContext().getPath();
                        const oModel = this.getOwnerComponent().getModel();
                        oModel.remove(sPath, {
                            success : this._handleUnlistActionResult.bind(this, oProductId, true, i + 1, aSelectedProducts.length),
                            error : this._handleUnlistActionResult.bind(this, oProductId, false, i + 1, aSelectedProducts.length)
                        });
                    }
                } else {
                    //this._showErrorMessage(this.getModel("i18n").getResourceBundle().getText("TableSelectProduct"));
                    sap.m.MessageToast.show("Error in updatign stock!")

                }
            },
    
    

        });
    });
  