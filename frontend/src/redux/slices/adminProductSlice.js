import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
    "adminProduct/fetchProducts",
    async(_,{rejectWithValue})=>{
        try {
            const response = await axios.get(
                `${API_URL}/api/admin/products`, 
                {
                    withCredentials: true,
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.message)
        }
    }
)
//async fuction to create products
export const createProducts = createAsyncThunk(
    "adminProduct/create/products",
    async(productData)=>{
        const response = await axios.post(
            `${API_URL}/api/admin/products`,
            productData,
            {
                withCredentials: true,
            }
        )
        return response.data;
    }
);

// async thunk to update an exting product 
export const updateProducts = createAsyncThunk(
    "adminProducts/updateProduct",
    async({id, updateData}, {rejectWithValue}) =>{
        try {
            const response = axios.post(
                `${API_URL}/api/admin/product/${id}`,
                updateData,
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.message)
        }
    }
);
//async thunk to delete a product 
export const deleteProduct = createAsyncThunk(
    "adminProduct/deleteProduct",
    async(id, {rejectWithValue})=>{
        try {
            await axios.delete(
                `${API_URL}/api/admin/products/${id}`,
                {
                    withCredentials: true,
                }
            )
            return id;
        } catch (error) {
            return rejectWithValue(error.response.message)
        }
    }
)