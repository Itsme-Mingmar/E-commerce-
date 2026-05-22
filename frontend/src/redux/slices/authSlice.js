import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import { clearCart } from './cartslice';

// retrieve user info from localStorage
const userFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

// check for existing guest id
const initialGuestId =
    localStorage.getItem("guestId") ||
    `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

// initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};


// =====================
// CHECK AUTH (NEW)
// =====================
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
                {
                    withCredentials: true,
                }
            );

            localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.data)
            );

            return response.data.data;

        } catch (error) {
            localStorage.removeItem("userInfo");
            return rejectWithValue("Session expired");
        }
    }
);


// =====================
// LOGIN
// =====================
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/userLogin`,
                userData,
                {
                    withCredentials: true,
                }
            );

            localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.data)
            );

            return response.data.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);


// =====================
// REGISTER
// =====================
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

            localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.data)
            );

            return response.data.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);


// =====================
// LOGOUT
// =====================
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/userLogout`,
                {},
                {
                    withCredentials: true,
                }
            );

            dispatch(clearCart());

            return true;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);


// =====================
// SLICE
// =====================
const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem(
                "guestId",
                state.guestId
            );
        }
    },

    extraReducers: (builder) => {
        builder

            // CHECK AUTH
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })

            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(checkAuth.rejected, (state) => {
                state.loading = false;
                state.user = null;

                localStorage.removeItem("userInfo");
            })


            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.loading = false;

                localStorage.removeItem("userInfo");

                state.guestId =
                    `guest_${new Date().getTime()}`;

                localStorage.setItem(
                    "guestId",
                    state.guestId
                );
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { generateNewGuestId } =
    authSlice.actions;

export default authSlice.reducer;