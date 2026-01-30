import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fuction to load cart from localstorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
}
// function to save cart to localStorage
const SaveCartTOStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

//fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    params: { userId, guestId },
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// add an item to the cart 
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async({productId, quantity, guestId, userId}, {rejectWithValue})=> {
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { 
                    productId,
                    quantity,
                    guestId,
                    userId,
                }
            );
            return response.data;
        } catch(error){
            return rejectWithValue(error.response.data);
        }
    }
);


