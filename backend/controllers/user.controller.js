import { user } from "../models/user.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import accesstoken from "../utils/token.js";

const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }
    const result = await user.findOne({ email });
    if (result) {
        throw new apiError(400, "User already exists");
    }
    const newUser = await user.create({
        name,
        email,
        password
    });
    const userCreated = await user.findById(newUser._id).select("-password");
    if (!userCreated) {
        throw new apiError(500, "User is not created");
    }
    const accessToken = accesstoken({ id: newUser._id, email: newUser.email });
    const options = {
        httpOnly: true,
        secure: false,        // for localhost
        sameSite: "lax"
    }
    res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .json(new apiResponse(201, userCreated, "User created successfully"));
});
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        throw new apiError(400, "Email required")
    }
    const client = await user.findOne({ email: email });
    if (!client) {
        throw new apiError(401, "User not found")
    }
    const result = await client.isPasswordCorrect(password)
    if (!result) {
        throw new apiError(400, "wrong password")
    }
    const accessToken = accesstoken({ id: client._id, email: client.email });
    const loginClient = await user.findById(client._id).select("-password").lean();
    const options = {
        httpOnly: true,
    }
    res.status(200)
        .cookie("accessToken", accessToken, options)
        .json(new apiResponse(
            200,
            loginClient,
            "Login successfully"
        ));


})
const userProfile = asyncHandler(async (req, res) => {
    const client = await user.findById(req.user?._id).select("-password")
    console.log(client);
    res.status(200).json(new apiResponse(200, client, "get user profile"))
});
export { userRegister, userLogin, userProfile };