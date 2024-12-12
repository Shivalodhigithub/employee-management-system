/* This file will start server */
const express = require('express')
const cors=require('cors')
const mongoose = require('mongoose');
const url=require('./config/url.config')
const port=require('./config/port.config')
const cookieParser = require('cookie-parser');
const app=express(); 

app.use(cors({
    origin:['https://shiva-emp-system.vercel.app'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json()) //middle ware to covert data into json format
app.use(express.static('Public'))
app.use(cookieParser());
 

//  connect to the mongo db 
mongoose.connect(url.dbUrl)
const db=mongoose.connection; 

db.on('error' , ()=>{
    console.log("DB not connected")
})

db.once('open',()=>{
    console.log("DB connected")
})

// sitch route to the server file  
require('./routes/auth.routes')(app);
require('./routes/category.routes')(app);
require('./routes/emp.routes')(app);
require('./routes/leave.routes')(app);
require('./routes/attendence.routes')(app);
/**
 * Server is running
 */
app.listen(port.PORT , () =>{
    console.log(`server is running on ${port.PORT}`)
})
