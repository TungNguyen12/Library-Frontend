import { configureStore } from "@reduxjs/toolkit";
import productsData from "../data/productsData";
import userReducer from "../../redux/reducers/userReducer";
import productsReducer from "../../redux/reducers/productsReducer";

const fakeStore = configureStore({
    reducer: {
        userReducer,
        productsReducer,
    },
    preloadedState: {
        productsReducer: {
            isLoading: false,
            products: productsData,
        },
    },
});

export default fakeStore;
