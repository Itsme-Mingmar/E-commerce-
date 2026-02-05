import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Async thunk to fetch user orders
const fetchUserOrder = createAsyncThunk(
    "orders/fetchUserOrders",
    async(orderId, {rejectedWithValue}) =>{
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
                {
                    withCredentials: true,
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
    async( fetchOrderDetails, {rejectedWithValue})=>{
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            rejectedWithValue(error.response.data)
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchUserOrder.pending, (state)=>{
            state.loading =true,
            state.error = null
        })
        .addCase(fetchUserOrder.fulfilled, (state, action)=>{
            state.loading =false,
            state.orders = action.payload;
        })
        .addCase(fetchUserOrder.rejected, (state, action)=>{
            state.loading =false,
            state.error = action.payload.message;
        })
        .addCase(fetchOrderDetails.pending, (state)=>{
            state.loading =true,
            state.error = null
        })
        .addCase(fetchOrderDetails.fulfilled, (state, action)=>{
            state.loading =false,
            state.orderDetails = action.payload;
        })
        .addCase(fetchOrderDetails.rejected, (state, action)=>{
            state.loading =false,
            state.error = action.payload.message;
        })
    }
})
export default orderSlice.reducer;