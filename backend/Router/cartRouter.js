import { Router } from "express";
import { addToCart, deleteCartProduct, getCart, mergeCart } from "../controllers/cart.controller.js";
import softJwtVerify from "../middleware/softAuth.middleware.js";
import jwtVerify from "../middleware/auth.middleware.js";

const cartRouter = Router();
cartRouter.put("/addToCart",softJwtVerify, addToCart);
cartRouter.delete("/deleteCartProduct", softJwtVerify, deleteCartProduct);
cartRouter.get("/getCart", softJwtVerify, getCart);
cartRouter.post("/mergeCart",jwtVerify, mergeCart);

export default cartRouter;