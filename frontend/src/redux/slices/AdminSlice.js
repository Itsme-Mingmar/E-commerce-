import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all users
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/fetchUsers`,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//Add the create user action
export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
                userData,
                {
                    withCredentials: true,
                }
            )
            return (await response).data;
        } catch (error) {
            return rejectWithValue(error.response.data);

        }
    }
);
// update user info
export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async ({ id, name, email, role }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            { name, email, role },
            {
                withCredentials: true,

            }
        )
        return response.data;
    }
);
// Delete a user
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async(id) =>{
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`,
            {
                withCredentials: true,
            }
        )
        return id;
    }
);

