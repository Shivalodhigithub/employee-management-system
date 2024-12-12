import {v2 as cloudinary} from 'cloudinary';
const fs=require('fs')
          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRETKEY 
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null

        //upload file 
         const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:auto
        })
        //file has been uploaded 
        console.log("file uploaded on Cloudinary",response)
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
        return null; 


        
    }
}

export {uploadOnCloudinary}