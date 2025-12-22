import Cart from "../models/cart.js";
import Product from "../models/products.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";

const addToCart = asyncHandler(async(req, res)=>{
    const {productId, quantity} = req.body
    let { guestId } = req.body;

    if (!guestId) {
    guestId = "guest_" + Date.now() + "_" + Math.random().toString(36);
    }
    const userId = req.user ? req.user._id : null;
    if(!productId){
        throw new apiError(400,"product id required")
    }
    if(!quantity || quantity < 1){
        throw new apiError(400, "Valid quantity is required");
    }
    const product = await Product.findById(productId);
    if(!product){
        throw new apiError(400, "Product now found")
    } 
    let cart;
    if(userId){
        cart = await Cart.findOne({user: userId});
    } else{
        cart = await Cart.findOne({guestId: guestId, user: null})
    }
    if(!cart){
        cart = new Cart({
            user: userId || undefined,
            guestId: userId ? undefined: guestId,
            product: [],
            totalPrice: 0
        })
    }
    const exitingItem = cart.product.findIndex(
       (item)=> item.productId.toString()===productId 
    )
    if(exitingItem !== -1){
        cart.product[exitingItem].quantity += quantity;
    }else{
        cart.product.push({
            productId: product._id,
            name: product.name,
            Image: product.images,
            price: product.price,
            quantity: quantity
        });
    }
    cart.totalPrice = cart.product.reduce((total, item)=>{
        return total + (item.price*item.quantity);
    }, 0);
    await cart.save();
    res.status(200).json(
        new apiResponse(201, cart, "Cart added successfully")
    )
});
const deleteCartProduct = asyncHandler(async(req, res)=>{
    const {productId, guestId} = req.body
    if(!productId){
        throw new apiError(400, "Product id required");
    }
    const userId = req.user?._id;
    const cart = await Cart.findOne(userId? {user: userId}: {guestId});
    if(!cart){
        throw new apiError(400, "there is no cart with this user");
    }
    cart.product = cart.product.filter((item)=>{
        return item.productId.toString() !== productId
    })
    cart.totalPrice = cart.product.reduce((total, item)=>{
        return total + (item.price * item.quantity);
    }, 0);
    cart.save();
    res.status(200).json( new apiResponse(200, cart, "Delete product successfully"));
});
const getCart = asyncHandler(async(req, res)=>{
    const {guestId} = req.query;
    const userId = req.user ? req.user._id : null
    if(!(guestId || userId)){
        throw new apiError(400, "There is no user or guest Id");
    }
    let cart;
    if(guestId){
        cart = await Cart.findOne({guestId: guestId})
    }
    else{
        cart = await Cart.findOne({user: userId})
    }
    if(!cart){
        res.json(new apiResponse(404, "Cart not found"))
    }
    res.status(200).json(new apiResponse(200, cart, "Access cart successfully"))
});
const mergeCart = asyncHandler(async(req, res)=>{
    const {guestId} = req.body;
    const guestCart = await Cart.findOne({guestId: guestId});
    if(!guestCart){
        res.status(200).json(new apiResponse(200, 
            "There is no guest cart"
        ));
    }
    const userId = req.user._id;
    const userCart = await Cart.findOne({user: userId});
    let finalCart = userCart;
    if(!finalCart){
        finalCart = new Cart({
            user: userId,
            product: [],
            totalPrice: 0 
        })
    }
    guestCart.product.forEach((guestItem)=>{
        const exitingItem = finalCart.product.find(
            Item => Item.productId.toString() === guestItem.productId.toString()
        )
        if(exitingItem){
            exitingItem.quantity += guestItem.quantity;
        }else{
            finalCart.product.push(guestItem);
        }
    });
    finalCart.totalPrice = finalCart.product.reduce((total, item)=>{
        return total + (item.price * item.quantity)
    }, 0);
    await finalCart.save();
    await Cart.deleteOne({guestId: guestId});
    res.status(200).json(
        new apiResponse(200, finalCart, "Cart merge successfully")
    );
});
export {addToCart, deleteCartProduct, getCart, mergeCart};