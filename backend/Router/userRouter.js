import { Router } from "express";
import { userLogin, userLogout, userProfile, userRegister } from "../controllers/user.controller.js";
import jwtVerify from "../middleware/auth.middleware.js";
const userRouter = Router();
userRouter.post("/userRegister", userRegister);
userRouter.post("/userLogin", userLogin);
userRouter.get("/profile",jwtVerify, userProfile);
userRouter.post("/userLogout", userLogout);
export { userRouter };
