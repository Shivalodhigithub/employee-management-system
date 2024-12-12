/** 
 * Here I need to intercept this with controller 
 * http://localhost/3000/auth/category'
 */

const categoryController=require('../controller/category.controller'); 
 

module.exports=(app)=>{
    app.post('/auth/category',categoryController.create)
    app.get('/auth/category',categoryController.Get);
}

