import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const roleVerify = asyncHandler(async(req, res, next)=>{
    if(req.user.role !== "admin"){
        new apiResponse(401, "Not authorized role");
    }
    next();
});
export default roleVerify;