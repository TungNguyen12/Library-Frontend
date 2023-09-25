import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Product from "../../types/Product";

import {
    createProductAsync,
    deleteProductAsync,
    fetchAllProductsAsync,
    updateProductAsync,
} from "../services/ProductServices";

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
            })
            .addCase(deleteProductAsync.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                };
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        isLoading: false,
                        error: action.payload.message,
                    };
                }
            })
            //updateProductAsync
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    const updatedProduct = action.payload;
                    const updatedProductsList = state.products.map(
                        (product) => {
                            if (product.id === updatedProduct.id) {
                                return updatedProduct;
                            } else {
                                return product;
                            }
                        }
                    );
                    return {
                        ...state,
                        products: updatedProductsList,
                        isLoading: false,
                    };
                }
            });
    },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
