import { Router } from "express";
import { getAllUsers, createNewUser, updateUser, deleteUser } from "../controllers/admin.controller.js";
import jwtVerify from "../middleware/auth.middleware.js";
import roleVerify from "../middleware/role.middleware.js";

const adminRouter = Router();
adminRouter.get("/getAllUsers", jwtVerify, roleVerify, getAllUsers);
adminRouter.post("/createNewUser", jwtVerify, roleVerify, createNewUser);
adminRouter.put("/updateUser/:id", jwtVerify, roleVerify, updateUser);
adminRouter.delete("/deleteUser/:id", jwtVerify, roleVerify, deleteUser);

export default adminRouter;