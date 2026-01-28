import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

//Async thuck for Fetch products by filters
export const fetchProductByFilter = createAsyncThunk(
    "products/fetchByFilters",
    async({
        category,
        tag,
    })=>{
        const query = new URLSearchParams();
        if(category) query.append("category", category);
        if(tag) query.append("tag", tag);

        const response = await axios.get(
            `${import.meta.VITE_BACKEND_URL}/api/products?${query.toString()}`
        );
        return response.data;

    }
)
// async thunk to fetch single product by ID
export const fetchProductDetails = createAsyncThunk(
    "product/fetchProductDetails",
    async(id) =>{
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${id}`
        )
        return response.data;
    }
);
// async thunk to fetch  products 
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async({id, productData}) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    }
)

// async thunk to fetch similar products 
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts",
    async({id}) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
        );
        return response.data;
    }
);

