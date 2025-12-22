import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { user } from "../models/user.js";

const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await user.find().select("-password");
    res.status(200).json(
        new apiResponse(200, users, "Successfully get all users")
    )
});
const createNewUser = asyncHandler(async(req, res)=>{
    const {name, email, password, role} = req.body;
    if(!(name||email||password)){
        throw new apiError(400, "Required to fill up all the fields")
    }
    const exitinguser = await user.findOne({email: email});
    if(exitinguser){
        throw new apiError(400, "user already exit with this email")
    }
    const newUser = await user.create({
        name,
        email,
        password,
        role
    });
    if(!newUser){
        throw new apiError(400, "Failed to create new user account");
    }
    res.status(200).json(
        new apiResponse(200, newUser, "User account created successfully")
    );
});
const updateUser = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const updates = req.body;
    if(!id){
        throw new apiError(400, "Cannot get user id")
    }
    const User = await user.findById(id);
    if(!User){
        throw new apiError(404, "There is no user of this id")
    }
    Object.keys(updates).forEach((key)=> {
        if(updates[key] !== ""){
            User[key] = updates[key]
        }
    });
    const updatedUser = await User.save();
    res.status(200).json(
        new apiResponse(200, updatedUser, "Update user details successfully")
    );
});
const deleteUser = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    if(!id){
        throw new apiError(400, "Required user ID")
    }
    const User = await user.findById(id);
    if(!User){
        throw new apiError(404, "user not found")
    }
    await User.deleteOne();
    res.status(200).json(
        new apiResponse(200, "Account deleted successfully")
    );
});

export {getAllUsers, createNewUser, updateUser, deleteUser};
