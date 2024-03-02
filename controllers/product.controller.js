// const productModel = require("../models/product.model")
const prod_model=require("../models/product.model")
const mongoose=require("mongoose")

exports.createNewProd=async(req,res)=>{
    const prod_data={
        category:req.body.category,
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
    try{
        const product=await prod_model.create(prod_data)
        return res.status(201).send(product)
    }
    catch(err){
        return res.status(500).send({
            message:"Product could not be added "
        })
    }
}
exports.getAllProds=async(req,res)=>{
  
    
    try{
        const products=await prod_model.find()
        return res.status(200).send(products)
    }
    catch(err){
        return res.status(500).send({
            message:"No Products found",
            err:err.message
        })
    }
}
exports.delprod=async(req,res)=>{
    const product_name={name:req.body.name}
    try{
        const prod=await prod_model.findOneAndDelete(product_name)
        return res.status(201).send({
            message:"product deleted"
        })

    }
    catch(err){
        return res.status(500).send({
            message:"product Not deleted"
        })
    }
}

exports.editProduct=async(req,res)=>{
    const productId=req.params.id
    const updateData={
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    };
    try{
        const updateProduct=await prod_model.findByIdAndUpdate(productId,updateData)
        if(!updateProduct){
            return res.status(404).send({
                message:"Product not Found"
            })
        }
        return res.status(200),send(updateProduct)

    }
    catch(err){
        return res.status(500).send({
            message:"Error While Updating"
        })
    }


}
