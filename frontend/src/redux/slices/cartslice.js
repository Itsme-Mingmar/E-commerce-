import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: { products: [] },
    loading: false,
    error: null,
};

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/getCart`,
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/addToCart`,
                { productId, quantity },
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { productId, quantity },
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/deleteCartProduct`,
                {
                    data: { productId },
                    withCredentials: true,
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
            .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(addToCart.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(addToCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
            .addCase(addToCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(updateCartItemQuantity.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
            .addCase(updateCartItemQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(removeFromCart.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(removeFromCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
            .addCase(removeFromCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;