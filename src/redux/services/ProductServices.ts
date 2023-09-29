import UpdateProductRequest from "../../types/product/UpdateProductRequest";
import CreateProductDto from "../../types/product/CreateProductRequest";
import axios, { AxiosError } from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import Product from "../../types/product/Product";

// UPDATE
export const updateProductAsync = createAsyncThunk(
    "updateProduct",
    async ({ id, update }: UpdateProductRequest): Promise<Product | Error> => {
        try {
            const response = await axios.put(
                `https://api.escuelajs.co/api/v1/products/${id}`,
                update
            );
            const updatedProduct: Product = response.data;
            console.log(updatedProduct);
            return updatedProduct;
        } catch (e) {
            const error = e as Error;
            return error;
        }
    }
);

//DELETE
export const deleteProductAsync = createAsyncThunk(
    "deleteProduct",
    async (productId: number) => {
        try {
            const response = await axios.delete(
                `https://api.escuelajs.co/api/v1/products/${productId}`
            );

            // CHECK AGAIN HERE (for author)
            if (response.data) {
                throw new Error("Cannot delete this product1");
            }
            return productId;
        } catch (e) {
            const error = e as Error;
            return error;
        }
    }
);

// CREATE
export const createProductAsync = createAsyncThunk(
    "createProduct",
    async (input: CreateProductDto) => {
        try {
            const response = await axios.post(
                `https://api.escuelajs.co/api/v1/products/`,
                input
            );
            const createdProduct: Product = response.data;
            return createdProduct;
        } catch (e) {
            const error = e as Error;
            return error;
        }
    }
);

// GET ALL
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
