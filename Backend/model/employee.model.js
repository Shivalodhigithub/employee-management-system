const mongoose=require('mongoose')

//create schema 
const empSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
        unique:true,
        minLength:15
    },
    salary:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    }
},{versionKey:false,timestamps:true})

//create model 
module.exports=mongoose.model('employee',empSchema)
