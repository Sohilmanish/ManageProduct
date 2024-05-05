sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
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
 
                onPress:function(oEvent){
                var pId= oEvent.getSource().getBindingContext().getProperty("ProductID")
                var oRouter = this.getOwnerComponent().getRouter();
                // var index= oEvent.getSource().getBindingContext('P').sPath.split('/')[1]
                // var pId=oEvent.getSource().getModel('P').getData()[0].ProductID
                oRouter.navTo("category", {pId: pId});
            }

        });
    });
  