import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './Router/userRouter.js';
import productRouter from './Router/productRouter.js';
import cartRouter from './Router/cartRouter.js';
import checkRouter from './Router/checkoutRouter.js';
import adminRouter from './Router/adminRouter.js';
import orderMngRouter from './Router/orderManagementRouter.js';
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api", userRouter);
app.use("/api",productRouter);
app.use("/api",cartRouter);
app.use("/api",checkRouter);
app.use("/api", adminRouter);
app.use("/api", orderMngRouter);

export default app;