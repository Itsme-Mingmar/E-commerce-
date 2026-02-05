import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Async thuck for Fetch products by filters
export const fetchProductByFilter = createAsyncThunk(
    "products/fetchByFilters",
    async ({category,tag,}) => {
        const query = new URLSearchParams();
        if (category) query.append("category", category);
        if (tag) query.append("tag", tag);

        const response = await axios.get(
            `${import.meta.VITE_BACKEND_URL}/api/products?${query.toString()}`
        );
        return response.data;

    }
)
// async thunk to fetch single product by ID
export const fetchProductDetails = createAsyncThunk(
    "product/fetchProductDetails",
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${id}`
        )
        return response.data;
    }
);
// async thunk to fetch  products 
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, productData }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
)

// async thunk to fetch similar products 
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts",
    async ({ id }) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
        );
        return response.data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null,
        similarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            tag: "",
        }
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                tag: "",
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductByFilter.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchProductByFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchProductByFilter.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            })
            //handle fetch single product details
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false
                state.error - action.error.message;
            })
            //handle upadating product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updateProduct = action.payload;
                const index = state.products.findIndex(
                    (product) => product._id === updateProduct._id
                );
                if (index !== -1) {
                    state.products[index] = updateProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                state.error - action.error.message;
            })
            // similar products 
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false
                state.error - action.error.message;
            })
    }
})
export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;