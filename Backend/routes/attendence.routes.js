/**
 *  I need to intercept this url 
 * http://localhost:3000/auth/attendence
 */
const atdController=require('../controller/attendence.controller')
module.exports=(app)=>{
    app.post('/auth/attendence')

}