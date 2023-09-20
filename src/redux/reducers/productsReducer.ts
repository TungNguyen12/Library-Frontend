import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Product from "../../types/Product";
import axios, { AxiosError } from "axios";

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
            });
    },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
