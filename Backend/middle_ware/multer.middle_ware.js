// const multer=require('multer')
const path=require('path')
const multer=require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./Public/Images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '_'+ Date.now() +path.extname(file.originalname))
    }
   }
)
   const upload=multer({
    storage:storage
    
   })
   module.exports=upload