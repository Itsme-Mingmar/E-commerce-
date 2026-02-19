import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fuction to load cart from localstorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
}

const initialState = {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
}
// function to save cart to localStorage
const SaveCartTOStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

//fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/getCart`,
                {
                    params: { guestId },
                    withCredentials: true,
                }
            )
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// add an item to the cart 
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/addToCart`,
                {
                    productId,
                    quantity,
                    guestId,
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

//update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ productId, quantity, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    productId,
                    guestId,
                    quantity,
                }
            )
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

//Remove an item from the cart 
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/deleteCartProduct`, {
                data: { productId, guestId },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
);

//merge guest cart into user cart 
export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({ guestId}, { rejectWithValue }) => {
        try {
            const response = axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/mergeCart`,
                { guestId },
                {
                    withCredentials: true,
                }
            )
            return await response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                SaveCartTOStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                SaveCartTOStorage(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add to cart";
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                SaveCartTOStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update item quantity";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                SaveCartTOStorage(action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to remove item";
            })
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                SaveCartTOStorage(action.payload);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to merge cart";
            })
    }
})
export const { clearCart } = cartSlice.actions
export default cartSlice.reducer;

