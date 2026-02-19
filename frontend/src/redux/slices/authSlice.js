import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import { mergeCart, fetchCart } from './cartslice';
import { clearCart } from './cartslice';


// retive user info and token from localstorage 
const userFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

//check for the exiting gest id 
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId)

//initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};
// async thunk for user login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/userLogin`,
                userData,
                {
                    withCredentials: true,
                }
            );

            // Save user info
            localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.data)
            );

            // Get guestId from state
            const { guestId } = getState().auth;

            //  If guest cart exists → merge
            if (guestId) {
                await dispatch(mergeCart({ guestId }));
            }

            //  Fetch updated user cart
            await dispatch(fetchCart());

            // Clear guestId from localStorage
            localStorage.removeItem("guestId");

            return response.data.data;

        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// async thunk for user Registration
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/userRegister`,
                userData,
                {
                    withCredentials: true,
                }
            );
            localStorage.setItem("userInfo", JSON.stringify(response.data.data));
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)
// async thunk for user logout
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/userLogout`,
                {},
                { withCredentials: true }
            );

            // Clear cart after logout
            dispatch(clearCart());

            return true;

        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


//slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.data?.message;
        })
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.data?.message;
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.loading = false;

            localStorage.removeItem("userInfo");

            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        });

        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export const { generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
