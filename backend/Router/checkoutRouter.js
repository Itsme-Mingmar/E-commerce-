import { Router } from "express";
import { createCheckout, createOrder, my_Orders, orderDetails } from "../controllers/checkout.controller.js";
import jwtVerify from "../middleware/auth.middleware.js";

const checkRouter = Router();
checkRouter.post("/createCheckout", jwtVerify, createCheckout);
checkRouter.post("/createOrder",jwtVerify, createOrder);
checkRouter.get("/myOrders",jwtVerify, my_Orders);
checkRouter.get("/orderDetails/:id",jwtVerify,  orderDetails);
export default checkRouter;
