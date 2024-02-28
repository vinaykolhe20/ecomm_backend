/**
 *  I need t write the Controller
 * logic to register user
 */
const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret=require("../configs/auth.config")

//SIGN UP
exports.signup=async(req,res)=>{
    //logic to create user
    //1 .read request body
    const request_body=req.body
    //2. insert data into Users collection in MongoDB
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password)
    }
    try{
        const user_created=await user_model.create(userObj)
        //Return this Error
        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt

        }
        res.status(201).send(res_obj)
    }
    catch(err){
        console.log("error while creating usre",err);
        res.status(500).send({
            message:"Some error happened while registering user"
        })
    }
    //3. Return response back to user
    
}

//SIGN IN
exports.signin=async(req,res)=>{
    //check if user id exists in the system
        //  console.log(req.body)
        const user = await user_model.findOne({userId : req.body.userId})
        if(user==null){
            return res.status(400).send({
                message:"User is passed is not valid user ID"
            })
        }
    //then check if password is matching otr correct
        const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
            if(!isPasswordValid){
                return res.status(401).send({
                    message:'Wrong Password Passed'
                })
            }
    //using jwt we will create access token with given TTL and return   
        const token=jwt.sign({id : user.userId},secret.secret,{
            expiresIn:120
        })

        res.status(200).send({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            accessToken:token
        })
}
//v