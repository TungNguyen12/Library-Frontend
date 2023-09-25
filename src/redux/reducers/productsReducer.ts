import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Product from "../../types/Product";
import axios, { AxiosError } from "axios";
import CreateProductDto from "../../types/CreateProductRequest";

const initialState: {
    products: Product[];
    isLoading: boolean;
    error?: string;
} = {
    products: [
        {
            id: 4,
            title: "Handmade Fresh Table",
            price: 687,
            description: "Andy shoes are designed to keeping in...",
            category: {
                id: 5,
                name: "Others",
                image: "https://placeimg.com/640/480/any?r=0.591926261873231",
            },
            images: [
                "https://placeimg.com/640/480/any?r=0.9178516507833767",
                "https://placeimg.com/640/480/any?r=0.9300320592588625",
                "https://placeimg.com/640/480/any?r=0.8807778235430017",
            ],
        },
    ],
    isLoading: false,
};

export const deleteProductAsync = createAsyncThunk(
    "deleteProduct",
    async (productId: number) => {
        try {
            const response = await axios.delete(
                `https://api.escuelajs.co/api/v1/products/${productId}`
            );
            console.log("Delete successfully", response);
            return productId;
        } catch (e) {
            const error = e as Error;
            return error;
        }
    }
);

export const createProductAsync = createAsyncThunk(
    "createProduct",
    async (input: CreateProductDto) => {
        try {
            const response = await axios.post(
                `https://api.escuelajs.co/api/v1/products/`,
                input
            );
            const createdProduct: Product = response.data;
            console.log(createdProduct);
            return createdProduct;
        } catch (e) {
            const error = e as Error;
            return error;
        }
    }
);

export const fetchAllProductsAsync = createAsyncThunk(
    "fetchAllProductsAsync",
    async () => {
        try {
            const response = await axios.get(
                `https://api.escuelajs.co/api/v1/products`
            );
            const data: Product[] = response.data;
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        sortProductByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
            if (action.payload === "asc") {
                state.products.sort((a, b) => a.price - b.price);
            } else {
                state.products.sort((a, b) => b.price - a.price);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchAllProductsAsync
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    return {
                        ...state,
                        products: action.payload,
                        isLoading: false,
                    };
                }
            })
            .addCase(fetchAllProductsAsync.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                };
            })
            .addCase(fetchAllProductsAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        isLoading: false,
                        error: action.payload.message,
                    };
                }
            })
            //createProductAsync
            .addCase(createProductAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    const newProducts = [...state.products, action.payload];
                    return {
                        ...state,
                        products: newProducts,
                        isLoading: false,
                    };
                }
            })
            .addCase(createProductAsync.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                };
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        isLoading: false,
                        error: action.payload.message,
                    };
                }
            })
            //deleteProductAsync
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                const foundIndex = state.products.findIndex(
                    (p) => p.id === action.payload
                );

                if (foundIndex !== -1) {
                    const newProductList = state.products.splice(foundIndex, 1);
                    return {
                        ...state,
                        products: newProductList,
                        isLoading: false,
                    };
                }
            });
    },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
