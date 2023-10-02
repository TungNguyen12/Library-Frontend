import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
    createProductAsync,
    deleteProductAsync,
    fetchAllProductsAsync,
    updateProductAsync,
} from "../services/ProductServices";
import ProductReducerState from "../../types/product/ProductReducerState";

export const initialState: ProductReducerState = {
    products: [
        {
            id: 4,
            title: "Handmade Fresh Table",
            price: 687,
            description: "Andy shoes are designed to keeping in...",
            category: {
                id: 5,
                name: "Clothes",
                image: "image",
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
        // fetchAllProductsAsync
        builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
            if (!(action.payload instanceof Error)) {
                return {
                    ...state,
                    products: action.payload,
                    isLoading: false,
                };
            }
        });
        builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        });
        builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload.message,
                };
            }
        });

        //createProductAsync ADMIN
        builder.addCase(createProductAsync.fulfilled, (state, action) => {
            state.products.push(action.payload);
        });
        builder.addCase(createProductAsync.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        });
        builder.addCase(createProductAsync.rejected, (state, action) => {
            state.error = action.payload as string;
        });

        //deleteProductAsync ADMIN
        builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
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
        builder.addCase(deleteProductAsync.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        });
        builder.addCase(deleteProductAsync.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload.message,
                };
            }
        });
        //updateProductAsync ADMIN
        builder.addCase(updateProductAsync.fulfilled, (state, action) => {
            const updatedProduct = action.payload;
            const updatedProductsList = state.products.map((product) => {
                if (product.id === updatedProduct.id) {
                    return updatedProduct;
                } else {
                    return product;
                }
            });
            return {
                ...state,
                products: updatedProductsList,
                isLoading: false,
            };
        });
    },
});

const productsReducer = productsSlice.reducer;
export const { sortProductByPrice } = productsSlice.actions;
export default productsReducer;
