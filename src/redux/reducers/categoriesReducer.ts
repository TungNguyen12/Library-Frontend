import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Category from "../../types/product/Category";
import axios, { AxiosError } from "axios";

// GET CATEGORY
export const fetchAllCategories = createAsyncThunk<
    Category[],
    void,
    { rejectValue: string }
>("fetchAllCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `https://api.escuelajs.co/api/v1/categories`
        );
        const category = response.data;
        return category;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.message);
    }
});

export interface CategoriesReducerState {
    categories: Category[];
    error?: string;
}

export const initialState: CategoriesReducerState = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
