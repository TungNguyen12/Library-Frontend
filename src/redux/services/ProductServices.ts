import UpdateProductRequest from "../../types/product/UpdateProductRequest";
import CreateProductDto from "../../types/product/CreateProductRequest";
import axios, { AxiosError } from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import Product from "../../types/product/Product";
import toast from "react-hot-toast";

// UPDATE
export const updateProductAsync = createAsyncThunk(
    "updateProduct",
    async ({ id, update }: UpdateProductRequest, { rejectWithValue }) => {
        try {
            const response = await axios.put<Product>(
                `https://api.escuelajs.co/api/v1/products/${id}`,
                update
            );
            toast.success(
                `Modified successfully, refresh to see the updated info`
            );
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    }
);

//DELETE
export const deleteProductAsync = createAsyncThunk(
    "deleteProduct",
    async (productId: number, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `https://api.escuelajs.co/api/v1/products/${productId}`
            );
            if (response.data) {
                throw new Error("Cannot delete this product1");
            }
            toast.success(`Product deleted!`);
            return productId;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    }
);

// CREATE
export const createProductAsync = createAsyncThunk(
    "createProduct",
    async (input: CreateProductDto, { rejectWithValue }) => {
        try {
            const response = await axios.post<Product>(
                `https://api.escuelajs.co/api/v1/products/`,
                input
            );
            const createdProduct: Product = response.data;
            console.log(createdProduct);
            toast.success(
                `Create new product successfully: ${createdProduct.title}`
            );
            return createdProduct;
        } catch (e) {
            const error = e as AxiosError;
            console.log(error.message);
            toast.error("Failed to create new product, try again!");
            return rejectWithValue(error.message);
        }
    }
);

// GET A SINGLE PRODUCT
export const fetchSingleProduct = createAsyncThunk<
    Product,
    number,
    { rejectValue: string }
>("fetchProductByCategories", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `https://api.escuelajs.co/api/v1/categories/${id}`
        );
        const category = response.data;
        return category;
    } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.message);
    }
});

// GET ALL
export const fetchAllProductsAsync = createAsyncThunk(
    "fetchAllProductsAsync",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://api.escuelajs.co/api/v1/products`
            );
            const data: Product[] = response.data;
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    }
);
