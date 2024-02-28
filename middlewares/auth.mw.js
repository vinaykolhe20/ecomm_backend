
const user_model=require("../models/user.model")
/**
 * create a mw will check if the 
 */

const verifySignUpBody=async(req,res,next)=>{
    try{
            //Check for the name
            if(!req.body.name){
                return res.status(400).send({
                    message:"Failed ! Name not provided"
                })
            }
             //Check for the email
             if(!req.body.email){
                return res.status(400).send({
                    message:"Failed ! Email not provided"
                })
            }
              //Check for the name
              if(!req.body.userId){
                return res.status(400).send({
                    message:"Failed ! User ID not provided"
                })
            }
            
            const user = await user_model.findOne({userId:req.body.userId})
            if(user){
                return res.status(400).send({
                    message:"Failed ! User already Exists"
                })
            }
            next()
    }
    catch(err){
        console.log("Error while validating the request object",err);
        res.status(500).send({
                message:"Error while validating the request body"
        })
    }
}
const verifySignInBody=async(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message:"Failed ! User ID not provided"
        })
    }    
    if(!req.body.password){
        return res.status(400).send({
            message:"Failed !  Password not provided"
        })
    }        
    next()
}
module.exports = {
    verifySignUpBody:verifySignUpBody,
    verifySignInBody:verifySignInBody
}