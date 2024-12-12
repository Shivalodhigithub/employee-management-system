const mongoose = require('mongoose')

//create schema 
mongoose.Schema({
    Empname:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'employee'
    },
    date:{
        type:Date
    },
    gate:{
        type:String
    }
 

})