import uploadCloudinary from "../utils/cloudinary.js";
import Product from "../models/products.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";

const productRegister = asyncHandler(async (req, res,) => {
  const user = req.user?._id;
  if (!user) {
    throw new apiError(400, "user not found");
  }
  const requiredFields = [
    "name",
    "description",
    "price",
    "countInStock",
    "sku",
    "category",
    "images"
  ];
  const missingFields = requiredFields.filter(field => {
    const value = req.body[field];
    return (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0)
    );
  });

  if (missingFields.length > 0) {
    throw new apiError(400, "Field value are missing");
  }
  const productData = {
    ...req.body,
    user,
  }
  const product = await Product.create(productData);
  if (!product) {
    throw new apiError(400, "Details of product are not save")
  }
  res.status(200).json(
    new apiResponse(200, product, "Details of product are save successfully")
  );

});

const productUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    throw new apiError(400, "Product ID is required");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new apiError(404, "product not found")
  }
  Object.keys(updates).forEach((key) => {
    if (updates[key] !== undefined) {
      product[key] = updates[key];
    }

  });
  const updatedproduct = await product.save();
  res.status(200).json(
    new apiResponse(200, updatedproduct, "updated successfully")
  );

});
const productDelete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new apiError(404, "product not found");
  }
  await product.deleteOne();
  res.status(200).json(new apiResponse(200, "Product deleted successfully"))
});
const filterProduct = asyncHandler(async (req, res) => {
  const { keyword, category, tags, weight } = req.query;
  const filter = {};
  if (keyword) {
    filter.$or = [{ name: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }];
  }
  if (category) {
    filter.category = category;
  }
  if (tags) {
    filter.tags = tags;
  }
  if (weight) {
    filter.weight = Number(weight);
  }
  const product = await Product.find(filter);
  res.status(200).json(
    new apiResponse(200, product, "product access successfully")
  );
});
const productDetails = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new apiError(400, "Required id to get product")
  }
  const product = await Product.findById(id);
  if (!product) {
    throw new apiError(400, "Product cannot find")
  }
  res.status(200).json(
    new apiResponse(200, product, "Product access successfully")
  )
});
const similarProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  if (!id) {
    throw new apiError(400, "Product id required");
  }
  const product = await Product.findById(id);
  if (!product) {
    throw new apiError(404, "Product not found")
  }
  const similarProduct = await Product.find({
    _id: { $ne: id },
    category: product.category
  }).limit(4)
  res.status(200).json(
    new apiResponse(200, similarProduct, "Get similar products successfully")
  )
});
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new apiError(400, "No file;");
  }
  const result = await uploadCloudinary(req.file.buffer, "Products");
  if (!result) {
    throw new apiError(400, "Fail to upload image")
  }
  res.status(200).json(new apiResponse(200, result.secure_url, "Image upload successful"));
});
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(new apiResponse(200, products, "products access successfully"))
});
//best-seller..?>.
const bestSeller = asyncHandler(async (req, res) => {
  const products = await Product.find({
    tags: "Best Seller",
  }).limit(8);
  if (!products || products.length === 0) {
    throw new apiError(404, "No best seller products found");
  }
  res.status(200).json(
    new apiResponse(200, products, "Best seller products fetched successfully")
  );
});
//new-arrival..?>.
const newArrival = asyncHandler(async (req, res) => {

  const products = await Product.find({
    tags: "New Arrival",
  }).limit(8);

  res.status(200).json(
    new apiResponse(200, products, "New arrival products fetched successfully")
  );
});

//dynamic rout for single product : 9:15
export { productRegister, productUpdate, productDelete, filterProduct, productDetails, similarProducts, uploadImage, getAllProducts, bestSeller, newArrival };