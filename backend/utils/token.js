import jwt from "jsonwebtoken";

const accesstoken = (payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}
export default accesstoken;