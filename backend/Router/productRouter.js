import { Router } from "express";
import jwtVerify from "../middleware/auth.middleware.js";
import roleVerify from "../middleware/role.middleware.js";
import { filterProduct, getAllProducts, productDelete, productDetails, productRegister, productUpdate, similarProducts, uploadImage, bestSeller, newArrival } from "../controllers/product.controller.js";
import upload from "../middleware/multer.middleware.js";

const productRouter = Router();
productRouter.post("/productRegister", jwtVerify, roleVerify, productRegister);
productRouter.put("/productUpdate/:id", jwtVerify, roleVerify, productUpdate);
productRouter.delete("/productDelete/:id",jwtVerify, roleVerify, productDelete);
productRouter.get("/filterProducts", filterProduct); 
productRouter.get("/productDetails/:id", productDetails);  
productRouter.get("/similarProducts/:id", similarProducts); 
productRouter.post("/uploadImage", jwtVerify, roleVerify, upload.single("image"), uploadImage);
productRouter.get("/getAllProducts", getAllProducts); 
productRouter.get("/getBestSeller", bestSeller); 
productRouter.get("/getNewArrivals", newArrival);
export default productRouter;