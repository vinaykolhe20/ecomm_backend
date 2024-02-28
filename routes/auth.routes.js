/**
 *   POST       localhost:8888/ecomm/api/v1/auth/signup
 */
const authController=require("../controllers/auth.controller")
const authMW=require("../middlewares/auth.mw")
module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody],authController.signup)

    //Route for post call for signin url
    app.post("/ecomm/api/v1/auth/signin",[authMW.verifySignInBody],authController.signin)
}
//now this route will be stiched to server in server.js


