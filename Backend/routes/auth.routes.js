/**
 * I need to intercept this http://localhost:3000/auth/adminlogin
 */
const authController=require('../controller/auth.controller')
const authMiddleWare=require('../middle_ware/auth.middle_ware')
module.exports=(app)=>{
    app.post('/auth/adminlogin' , authController.signIn)
    app.head('/adminlogin', (req, res) => {
    res.status(200).send('OK');
});

    app.get('/auth/verifyuser',[authMiddleWare.verifyUser],authController.verify)
    app.get('/auth/adminlogin_cnt' , authController.cntAdmin)
    app.get('/auth/adminlogout',authController.logOutAdmin)
}
