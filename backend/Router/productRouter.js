import { Router } from "express";
import jwtVerify from "../middleware/auth.middleware.js";
import roleVerify from "../middleware/role.middleware.js";
import { filterProduct, getAllProducts, productDelete, productDetails, productRegister, productUpdate, similarProducts, uploadImage, bestSeller } from "../controllers/product.controller.js";
import upload from "../middleware/multer.middleware.js";

const productRouter = Router();
productRouter.post("/productRegister", jwtVerify, roleVerify, productRegister);
productRouter.put("/productUpdate/:id", jwtVerify, roleVerify, productUpdate);
productRouter.delete("/productDelete/:id",jwtVerify, roleVerify, productDelete);
productRouter.get("/filterProducts", jwtVerify, filterProduct);
productRouter.get("/productDetails/:id", jwtVerify, productDetails);
productRouter.get("/similarProducts/:id",jwtVerify, similarProducts);
productRouter.post("/uploadImage", jwtVerify, roleVerify, upload.single("image"), uploadImage);
productRouter.get("/getAllProducts", jwtVerify, roleVerify, getAllProducts);
productRouter.get("/getBestSeller", bestSeller);
export default productRouter;