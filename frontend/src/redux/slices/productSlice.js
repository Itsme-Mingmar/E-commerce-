import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk for all products 
export const fetchAllProducts = createAsyncThunk(
    "products/fetchAll",
    async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/getAllProducts`,
            {
                withCredentials: true,
            }
        );
        return response.data.data;
    }
);

//Async thuck for Fetch products by filters
export const fetchProductByFilter = createAsyncThunk(
    "products/fetchByFilters",
    async ({ category, tags, }) => {
        const query = new URLSearchParams();
        if (category) query.append("category", category);
        if (tags) query.append("tags", tags);
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/filterProducts?${query.toString()}`
        );
        return response.data.data;
    }
)
// async thunk to fetch single product by ID
export const fetchProductDetails = createAsyncThunk(
    "product/fetchProductDetails",
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/productDetails/${id}`
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
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/similarProducts/${id}`
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
        productLoading: false,
        similarLoading: false,
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

            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                console.log("PAYLOAD:", action.payload);
                state.products = action.payload;
            })

            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
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
                state.productLoading = true,
                    state.error = null
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.productLoading = false;
                state.selectedProduct = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.productLoading = false
                state.error = action.error.message;
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
                state.error = action.error.message;
            })
            // similar products 
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.similarLoading = true,
                    state.error = null
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.similarLoading = false;
                state.similarProducts = action.payload.data;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.similarLoading = false
                state.error = action.error.message;
            })
    }
})
export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;