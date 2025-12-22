import Checkout from "../models/checkOut.js";
import Product from "../models/products.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";

const createCheckout = asyncHandler(async(req,res)=>{
    const userId = req.user?._id;
    if(!userId){
        throw new apiError(400, "Not found userId")
    }
    const {shippingAddress,paymentMethod} = req.body;
    if(!(shippingAddress && paymentMethod)){
        throw new apiError(400, "Address and paymentMethod must required")
    }
    const cart = await Cart.findOne({user: userId});
    if(!cart){
        throw new apiError(400, "Cart is now found");
    }
    const productItems=[];
    let totalPrice = 0;
    for(const item of cart.product){
        const dbProduct = await Product.findById(item.productId)
        if(!dbProduct){
            throw new apiError(404, "The product in your cart no longer exits")
        }
        const totalLine = dbProduct.price * item.quantity;
        totalPrice += totalLine;
        productItems.push({
            productId: dbProduct._id,
            name: dbProduct.name,
            image: dbProduct.images?.[0].url,
            price: dbProduct.price,
            quantity: item.quantity
        })
    }
    const newCheckout = await Checkout.create({
        user: userId,
        checkoutItems: productItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        status: "initiated"
    });
    res
    .status(200)
    .json(
        new apiResponse(200, newCheckout, "Checkout session created successfully")
    );
});
const createOrder = asyncHandler(async(req, res)=>{
    const {checkoutId, paymentInfo, isPaid} = req.body;
    if(!checkoutId){
        throw new apiError(200, "checkoutId must required");
    }
    const checkout = await Checkout.findById(checkoutId);
    if(!checkout){
        throw new apiError(404, "checkout not found")
    }
    if (checkout.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized for this checkout" });
    }
    if(!(paymentInfo && isPaid)){
        throw new apiError(400, "payment is not confirmed")
    }
    const newOrder = await Order.create({
        user: checkout.user,
        items: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        paymentInfo: paymentInfo,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: new Date(),
        status: "pending"
    })
    await Cart.deleteOne({ user: checkout.user });
    await Checkout.deleteOne({_id: checkoutId});
    res.status(200).json(new apiResponse(200, newOrder, "place oder successfully"));
});
const my_Orders = asyncHandler(async(req, res)=>{
    const user = req.user._id;
    if(!user){
        throw new apiError(400, "Cant get userId");
    }
    const orders = await Order.find({user: user});
    res.status(200).json(new apiResponse(200, orders, "Get list of orders"))
});
const orderDetails = asyncHandler(async(req, res)=>{
    const orderId = req.params.id;
    if(!orderId){
        throw new apiError(400, "Required product Id")
    }
    const order = await Order.findById(orderId).populate("user", "name email");
    res.status(200).json(new apiResponse(200, order, "Access order details successfully"));
});
export {createCheckout, createOrder, my_Orders, orderDetails};  