/**
 * i need to intercept this url with controller
 * http://localhost:3000/auth/empolyee
 */
 
const empController=require('../controller/employee.controller')
const upload=require('../middle_ware/multer.middle_ware')
const multer=require('multer')
 
module.exports=(app)=>{
    app.post('/auth/empolyee',[upload.single('image')],empController.createEmp)
    app.post('/auth/empolyeelogin',empController.empLogin)
    app.get('/auth/empolyee', empController.getEmp)
    app.get('/auth/employee/:_id', empController.getSingleEmp)
    app.put('/auth/employee/:_id', empController.updateEmp)
    app.delete('/auth/employee/:_id', empController.deleteEmp)
    app.get('/auth/employee_cnt',empController.getCountEmp)
    app.get('/auth/employee_cntsalary',empController.getCountSalary)
    app.get('/auth/employeelogout',empController.logout)

}
// http://localhost:3000/auth/employeelogout