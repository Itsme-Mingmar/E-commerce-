import { Router } from "express";
import { addToCart, deleteCartProduct, getCart } from "../controllers/cart.controller.js";
import jwtVerify from "../middleware/auth.middleware.js";

const cartRouter = Router();
cartRouter.put("/addToCart",jwtVerify, addToCart); 
cartRouter.delete("/deleteCartProduct", jwtVerify, deleteCartProduct);
cartRouter.get("/getCart", jwtVerify, getCart);

export default cartRouter;