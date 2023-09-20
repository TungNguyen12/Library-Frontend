import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";

const store = configureStore({
    reducer: {
        productsReducer,
    },
});

export type PeteState = ReturnType<typeof store.getState>;
export type PeteDispatch = typeof store.dispatch;

export default store;
