/**
 * need to write logic controller here
 */

const adminModel=require('../model/admin.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const sec_key=require('../config/seckey.config')
exports.signUp=(req,res)=>{
    try {
        //read data from req body 
        const req_body = req.body;

        const dataObj={
            name:req_body.name,
            email:req_body.email,
            password:bcrypt.hash(req.req_body.password,8),
            mobile:req_body.mobile
        }

        //store data in data base 

        //return response
        
    } catch (error) {
        console.log("Internal server error",error);
        
    }
}
exports.signIn=async(req,res)=>{
    try {
        // 1.read the req body 
        const user1 = req.body;
        // console.log(user1)


        // 2.insert the data into data base 
        const User=await adminModel.findOne({email:req.body.email})
        if(!User) {
            return res.status(200).json({loginStatus:false,Error:'User does not exist'})
           
        }

        // generate token  
        const token=jwt.sign({role:'admin',email:User.email , _id:User._id},sec_key.sec_key,{expiresIn:'1hr'})
        res.cookie('token', token)
        // console.log(gentoken); 

        //3.return response
        return res.status(200).json({loginStatus:true })
        
    } catch (error) {
        console.log(" Intel Error while SignIn",error) 

        // send to fronted error  
        res.status(400).json({loginStatus:false,Error:'Internal server error'})

        
    }
}

/**
 * Get number of admin
 */
exports.cntAdmin=async(req,res)=>{
    try {
      const n=await adminModel.countDocuments({})
      return res.status(200).json({Status:true,count:n})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({Status:false}) 
    }
}

/**
 * verify user
 */
exports.verify=(req,res)=>{
    try {
        return res.json({Status:true, role:req.role ,_id:req._id})
        
    } catch (error) {
        console.log("Internal server Error",error)
        
    }
}
/**
 * log out admin
 */

exports.logOutAdmin=(req,res)=>{
    try {
         res.clearCookie('token')
         return res.status(200).json({Status:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({Status:false})
    }
}



