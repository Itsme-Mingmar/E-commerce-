import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";

const uploadCloudinary = (fileBuffer, folder = "Products") =>{
  //still confuse it doesnt work if i config the cloudinary above the function cal. I got undefied .env data
  cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });
  
  return new Promise((resolve, reject)=>{
    const stream = cloudinary.uploader.upload_stream(
      {folder},
      (error, result)=>{
        if(error){
          reject(error)
        }else{
          resolve(result)
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}
export default uploadCloudinary;