const leaveModel=require('../model/leave.model')
exports.createLeave=async(req,res)=>{
    try {
        //read the request body 
        // console.log(req.params._id)
        // console.log("from leave controller")
        const _id=req.params._id
        // console.log(req.body)
        const persent = await leaveModel.findOne({employeeId:_id})
        if(persent){
            return res.json({Status:false,Error:"Your Leave Request already exits"})
        }
        const leaveObj={
            employeeId:_id,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            reason:req.body.reason   
        }
        // console.log(leaveObj) 
        //and store in db 
        const leaveCreated= await leaveModel.create(leaveObj)

        //and send response to the server 
        return res.json({Status:true,leaveCreated})
    } catch (error) {
        console.log("Internal Error",error)
        return res.Status({Status:false})
    }
}

/**
 * get all the leaves 
 */

exports.getLeave=async(req,res)=>{
    try {
        const leaveData = await leaveModel.find()
        
        return res.json({Status:true , leaveData})

        
    } catch (error) {
        console.log(error)
        return res.json({Status:false})
        
    }
}

exports.updateLeave=async(req,res)=>{
    try {
        
        const _id=req.params._id;
        const changed = await leaveModel.findOneAndUpdate({_id:_id},req.body,{returnDocument:'after'})
        // console.log(changed)
        return res.json({Status:true,changed})
         
    } catch (error) {
        console.log(error)
        return res.json({Status:false,Error:'Internal Server Error'})
        
    }
}