const authMw = require("../middlewares/auth.mw")

/**
 * //POST   0.0.0.0/8888/ecomm/api/v1/categories
 */
category_controller=require("../controllers/category.controller")
auth_mw=require("../middlewares/auth.mw")
module.exports=(app)=>{
    app.post("/ecomm/api/v1/categories",[auth_mw.verifyToken, authMw.isAdmin],category_controller.createNewCategory)
    // app.delete("/ecomm/api/v1/categories/delete",[authMw.isAdmin],category_controller.deleteCat)
}