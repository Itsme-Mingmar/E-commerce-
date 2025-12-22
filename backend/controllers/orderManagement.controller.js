import Order from "../models/order.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { user } from "../models/user.js";

const allOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(
        new apiResponse(200, orders, "list of orders")
    ) 
});
const updateOrderStatus = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const status = req.body.status;
    const order = await Order.findById(id);
    if(!order){
        throw new apiError(404, "Not found order")
    }
    if(status !== ""){
        order.status = status;
    }
    const updatedOrder = await order.save();
    res.status(200).json(
        new apiResponse(200, updatedOrder, "Order status update successfully")
    )
});
const deleteOrder = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const order  = await Order.findById(id);
    if(!order){
        throw new apiError(404, "order not found")
    }
    await order.deleteOne();
    res.status(200).json(
        new apiResponse(200, "Order deleted successfully")
    )
});
export {allOrders, updateOrderStatus, deleteOrder}