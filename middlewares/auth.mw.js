
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const auth_config=require("../configs/auth.config")
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
const verifyToken=(req,res,next)=>{
    //check if the token is present in the header
    const token=req.headers['x-access-token'] //if in the header 
    if(!token){
        return res.status(403).send({
            message:"No token Found : Unauthorized"
        })
    }
    //If it's the valid token
    jwt.verify(token, auth_config.secret,async(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized !"
            })
        }
        const user=await user_model.findOne({userId:decoded.id})
        if(!user){
            return res.status(400).send({
                message:"Unauthorized , this user for this token doesn't exist"
            })
        }
        //Set the user info in the req body
        req.user=user
        next()
    })
    
    //then move to the next step

}
const isAdmin=(req,res,next)=>{
    const user=req.user
    if(user && user.userType=="ADMIN"){
        next() //next means go ahead all is good and here it means that user is a ADMIN
    }else{
        return res.status(403).send({
            messsage:"You are not Authorized to use this function : Only ADMIN Can "
        })
    }
}
module.exports = {
    verifySignUpBody:verifySignUpBody,
    verifySignInBody:verifySignInBody,
    verifyToken:verifyToken,
    isAdmin:isAdmin
}