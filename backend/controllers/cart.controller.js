import Cart from "../models/cart.js";
import Product from "../models/products.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";

const addToCart = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new apiError(401, "Please login to add items to cart");
    }

    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!productId) throw new apiError(400, "Product id required");
    if (!quantity || quantity < 1) throw new apiError(400, "Valid quantity is required");

    const product = await Product.findById(productId);
    if (!product) throw new apiError(404, "Product not found");

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({
            user: userId,
            products: [],
            totalPrice: 0,
        });
    }

    const existingIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (existingIndex !== -1) {
        cart.products[existingIndex].quantity += quantity;
    } else {
        cart.products.push({
            productId: product._id,
            name: product.name,
            images: product.images,
            price: product.price,
            quantity: quantity,
        });
    }

    cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    await cart.save();
    res.status(200).json(new apiResponse(200, cart, "Cart updated successfully"));
});
const deleteCartProduct = asyncHandler(async (req, res) => {
    const { productId } = req.body
    if (!productId) {
        throw new apiError(400, "Product id required");
    }
    const userId = req.user?._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new apiError(400, "there is no cart with this user");
    }
    cart.products = cart.products.filter((item) => {
        return item.productId.toString() !== productId
    })
    cart.totalPrice = cart.products.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    await cart.save();
    res.status(200).json(new apiResponse(200, cart, "Delete product successfully"));
});
const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id ;
    if (!(userId)) {
        throw new apiError(400, "There is no user ");
    }
    let cart;
    cart = await Cart.findOne({ user: userId })
    if (!cart) {
        throw new apiError(404, "Cart not found");
    }
    res.status(200).json(new apiResponse(200, cart, "Access cart successfully"))
});
export { addToCart, deleteCartProduct, getCart };