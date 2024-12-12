/** 
 * write logic here
 */

 
const CategoryModel = require('../model/category.model');

/**
 1. Create Category
 */
exports.create = async (req, res) => {
    
    try {
        //1.read data from request body 
        const req_body=req.body.category;
        const categoryName = req_body.categoryName
        const departmentName = req_body.departmentname;
        // console.log(categoryName)
        const catObj = {
            CategoryName: categoryName,
            DepartmentName:departmentName
        }
        // 2. insert into db 
        const createdCategory = await CategoryModel.create(catObj)

        // 3.return response 
        // console.log(createdCategory)
        return res.status(200).json({Status:true , Message:'Succesfully Added'})

    } catch (error) {
        console.log("Internal Server Error", error)
         res.status(400).json({ Status:false , Error: 'Internal Server Error' })
    }

}

/**
 1. Get Category
 */

 exports.Get=async(req,res)=>{
    try {
        //1. read the data from request body 

        // 2.fetch the data frm db  
    //    const categories = awiat CategoryModel.find({})
       const Catdata = await CategoryModel.find();

       //3.return response 
       return res.status(200).json({Status:true,categories:Catdata})

        
    } catch (error) {
        console.log("Internal Server Error",error); 
        res.status(400).json({Status:false,Error:"Internal Server Error"})
    }

 }