const authMw = require("../middlewares/auth.mw")


/**
 *  //POST   0.0.0.0/8888/ecomm/api/v1/products
 */

const product_controller=require("../controllers/product.controller")
module.exports=(app)=>{
    app.post("/ecomm/api/v1/products",[authMw.verifyToken, authMw.isAdmin],product_controller.createNewProd)
    app.get("/ecomm/api/v1/products",product_controller.getAllProds)
    app.delete("/ecomm/api/v1/products",[authMw.verifyToken, authMw.isAdmin],product_controller.delprod)
    app.put("/ecomm/api/v1/products/:id",[authMw.verifyToken, authMw.isAdmin],product_controller.editProduct)
}