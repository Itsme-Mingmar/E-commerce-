import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async (checkoutdata, { isRejectedWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                checkoutdata,
                {
                    withCredentials: true,
                }
            )
            return response.data;
        } catch (error) {
            return isRejectedWithValue(error.response.data);
        }
    }
);

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkoutSlice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkoutSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(checkoutSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});
export default checkoutSlice.reducer;
