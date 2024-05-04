sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.manish.manageproduct.controller.page2", {
        onInit: function () {
            UIComponent.getRouterFor(this).getRoute("RouteViewSupplier").attachPatternMatched(this.onObjectMatched, this);
            
        },

        onObjectMatched : function (oEvent) {
            const that = this
            var sPID =  oEvent.getParameter("arguments").pId;

            const oModel = this.getOwnerComponent().getModel();
            
            // Read supplier data
            oModel.read("/Products("+ sPID +")/Supplier", {
                     success : function(oSupplierData, response) {
                        console.log('supplier data = ', oSupplierData)
                        let oJSONMOdel1 = new JSONModel()
                        oJSONMOdel1.setData(oSupplierData)
                        that.getView().setModel(oJSONMOdel1, "S")    
                     },
                     
                     error: function(oError) {
                        console.log(oError)
                    }
            })
            //end

            // Read product data
            oModel.read("/Products("+sPID+")", {
                success : function(oSupplierData, response) {
                   console.log('product data = ', oSupplierData)
                   let oJSONMOdel1 = new JSONModel()
                   oJSONMOdel1.setData(oSupplierData)
                   that.getView().setModel(oJSONMOdel1, "PD")    
                },
                
                error: function(oError) {
                   console.log(oError)
               }
             })    
        },

        getRouter : function () {
            return UIComponent.getRouterFor(this);
        }
      });
    }
  );
  