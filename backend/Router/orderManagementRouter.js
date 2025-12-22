import { Router } from "express";
import { allOrders, updateOrderStatus, deleteOrder } from "../controllers/orderManagement.controller.js";
import jwtVerify from "../middleware/auth.middleware.js";
import roleVerify from "../middleware/role.middleware.js";

const orderMngRouter = Router();
orderMngRouter.get("/getOrders", jwtVerify, roleVerify, allOrders);
orderMngRouter.put("/updateOrderStatus/:id", jwtVerify, roleVerify, updateOrderStatus);
orderMngRouter.delete("/deleteOrder/:id",jwtVerify, roleVerify, deleteOrder);
export default orderMngRouter;