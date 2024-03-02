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

// exports.deleteCat=async(req,res)=>{
//     const category=req.body.name
//     try{
//         const categ = await category_model.deleteOne(category)
//         return res.status(201).send(categ)({
//             message:"category is deleted"
//         })
//     }catch(err){
//         return res.status(501).send({
//             message:"Error while deleting the category"
//         })
//     }
    
// }
// exports.deleteCategory = async (req, res) => {
//     // Get the category ID from the request parameters
//     const categoryId = req.body.name;
  
//     // Validate the ID (optional, but recommended for security)
//     if (categoryId && !isValidObjectId(categoryId)) {
//       return res.status(400).send({ message: 'Invalid category ID' });
//     }
  
//     // Attempt to delete the category with matching ID
//     try {
//       const deletedCategory = await category_model.findByIdAndDelete(categoryId);
  
//       // Check if a category was deleted
//       if (!deletedCategory) {
//         return res.status(404).send({ message: 'Category not found' });
//       }
  
//       // Return a successful response with the deleted category data
//       res.status(200).send({ message: 'Category deleted successfully', deletedCategory });
//     } catch (err) {
//       console.error('Error while deleting category:', err);
//       res.status(500).send({ message: 'Error deleting category' });
//     }
//   }