/**
 * Controller for creating 
 */
//0.0.0.0/8888/ecomm/api/v1/categories
/**
 *  {
 *      "name":"Household",
 *      "description":"This will have all the household items"
 *  }
 */
const category_model=require("../models/category.model")
const mongoose=require("mongoose")
exports.createNewCategory=async(req,res)=>{
    //Read the req body
        const cat_data={
            name:req.body.name,
            description:req.body.description
        }
    //Create the Category object

    try{
        //Insert into MongoDb
        const category=await category_model.create(cat_data)
        return res.status(201).send(category)
    }catch(err){
        console.log("error while creating the category",err)
        return res.status(500).send({
            message:"error while creating the category"
        })
    }
    

    //return the response of the created category

}
exports.deleteCat=async(req,res)=>{
    
}