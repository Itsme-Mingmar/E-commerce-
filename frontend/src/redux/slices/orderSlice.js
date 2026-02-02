import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//Async thunk to fetch user orders
const fetchUserOrder = createAsyncThunk(
    "orders/fetchUserOrders",
    async(orderId, {rejectedWithValue}) =>{
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
                {
                    headers: {
                        //authorization
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);
// Async thunk to fetch orders details by ID
export const fetchOrderDetails = createAsyncThunk(
    "orders/fetchOrderDetails",
    async(fetchOrderDetails, {rejectedWithValue})=>{
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
                {
                    //authorization
                },
            );
            return response.data;
        } catch (error) {
            rejectedWithValue(error.response.data)
        }
    }
);