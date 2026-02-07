import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
                {
                    withCredentials: true,
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
// update order delivery status
export const updateOrdersStatus = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, { status },
                {
                    withCredentials: true,
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// delete an orders
export const deleteOrder = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                {
                    withCredentials: true,
                }
            )
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totoalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totoalOrders = action.payload.length;

                const totalSales = action.payload.reduce((acc, order) => {
                    return acc + order.totalPrice;
                }, 0);
                state.totalSales = totalSales;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            //update status
            .addCase(updateOrdersStatus.fulfilled, (action, state) => {
                const updatedOrder = action.payload;
                const orderIndex = state.orders.findIndex(
                    (order) => order._id === updatedOrder._id
                )
                if(orderIndex !== -1){
                    state.orders[orderIndex] = updatedOrder;
                }
            })
            .addCase(deleteOrder.fulfilled, (state, action)=>{
                state.orders = state.orders.filter(
                    (order)=> order._id !== action.payload
                )
            });
    }
});
export default adminOrderSlice.reducer;