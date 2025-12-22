import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { user } from "../models/user.js";
import apiError from "../utils/apiError.js";

const softJwtVerify = asyncHandler(async(req, _, next)=>{
    const token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ", "");
    if(!token){
       return next();
    }    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    const client = await user.findById(decodedToken?.id || decodedToken?._id).select("-password");
    if(!client){
        throw new apiError(400, "Invalid token")
    }
    req.user = client;
    next();
});
export default softJwtVerify;


