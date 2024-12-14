/**
 * We need to write logic here
 */
const empModel=require('../model/employee.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const sec_key=require('../config/seckey.config')
 
/**
 * create employee
 */
exports.createEmp=async(req,res)=>{
    try { 
        const req_body=req.body;
        console.log(req_body)
        console.log(req.file.filename)
        // console.log(req.body.filename)
        const empObj={
            name:req_body.name,
            email:req_body.email,
            password:bcrypt.hashSync(req_body.password,8),
            salary:req_body.salary,
            address:req_body.address,
            category:req_body.category_id
        }

        // insert data into db  
        const created=await empModel.create(empObj)

        //send response back 
        return res.status(200).json({Status:true})
        
        
    } catch (error) {
        console.log("Internal Server Error",error)
        return res.status(400).json({Status:false,Error:'Internal Server Error'})
        
    }
}

/**
 * login employee
 */
exports.empLogin=async(req,res)=>{
    try {
        console.log(req.body)
        //fetch the data from  db based upon email 
        const data = await empModel.findOne({email:req.body.email})
         
        // and validate with request data 
        if(!data){
            return res.status(200).json({Status:false,Error:'wrong email or password'})
        }
        const yes=bcrypt.compareSync(req.body.password,data.password)
        if(!yes){
            return res.status(200).json({Status:false,Error:'wrong email or password'})
        }
        //generate token and send cookies
        const gentoken=jwt.sign({role:'employee',email:data.email, _id:data._id},sec_key.sec_key,{expiresIn:'1hr'})
        res.cookie('token', gentoken)

        //return response back to the server 
        return res.status(200).json({Status:true,_id:data._id})  
    } catch (error) {
        console.log(error)
        return res.status(500).json({Status:false,Error:'Internal Server Error'})
    }
}

/**
 * fetch all employee
 */
exports.getEmp=async(req,res)=>{
    try {

        //fetch all the records data from data base
        const empdata = await empModel.find()

        // return response to the cleint 
        return res.status(200).json({Status:true,empdata:empdata})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({Status:false,Error:'Internal Server Error'})
    }
}
/**
 * fetch single employee
 */
exports.getSingleEmp=async(req,res)=>{
    try {
         const id=req.params._id; 
         console.log(req.params._id)

        //fetch all the records data from data base
        // const empdata = await empModel.findById({_id:id})
        const empdata= await empModel.findOne({_id:id})

        // return response to the cleint 
     
        return res.status(200).json({Status:true,empdata:empdata})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({Status:false,Error:'Internal Server Error'})
    }
}

/**
 * update employee
 */
exports.updateEmp=async(req,res)=>{
    try {
        const _id=req.params._id; 
        
        //1.find and update data 
        const empUpdated=await empModel.findByIdAndUpdate({_id:_id},req.body,{returnDocument:'after'})

        //return response 
        return res.status(200).json({Status:true,empUpdated});

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({Status:false,Error:"Internal Server Error"});
    }
  
}

/**
 * delete employee
 */

exports.deleteEmp=async(req,res)=>{
    try {
        const _id=req.params._id;  
        const empDeleted=await empModel.findByIdAndDelete({_id:_id})
         
        return res.status(200).json({Status:true});   
    } catch (error) {
        console.log(error)
        return res.status(500).json({Status:false}) 
    }
}

/**
 * Count number of employee
 */
exports.getCountEmp=async(req,res)=>{
    try {
        const n=await empModel.countDocuments({})
        return res.status(200).json({Status:true,count:n});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({Status:false})
        
    }
}
exports.getCountSalary=async(req,res)=>{
    try {
        const countSal = await empModel.aggregate([{ $group: { _id: null, total: { $sum: "$salary" } } }]);
        // console.log("Total salary:", countSal.length > 0 ? countSal[0].total : 0);
        const totalSalary=countSal.length > 0 ? countSal[0].total : 0;
        return res.status(200).json({Status:true,totalSalary})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({Status:false})
        
    }

}

exports.logout=(req,res)=>{
    try {
        res.clearCookie('token')
        return res.json({Status:true})
        
    } catch (error) {
        console.log(error) 
        return res.json({Status:false})
    }
}
// async function getCount() {
//     try {
//         const countSal = await empModel.aggregate([{ $group: { _id: null, total: { $sum: "$salary" } } }]);
//         console.log("Total salary:", countSal.length > 0 ? countSal[0].total : 0);
//         return countSal.length > 0 ? countSal[0].total : 0;
//     } catch (err) { 
//         console.error("Error counting documents:", err);
//         throw err;
//     }
// }

// getCount(); // Call the async function to get the count


 


 
