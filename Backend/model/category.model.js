const mongoose=require('mongoose')

//create schema 
const categorySchema=new mongoose.Schema({
    CategoryName:{
        type:String,
        required:true,
        uppercase:true

    },
    DepartmentName:{
        type:String,
        required:true,
        
    }
},{versionKey:false , timestamps:false})

//create collection or model 

module.exports=mongoose.model('category',categorySchema);