import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/userReducer";
import { PersistConfig } from "redux-persist/lib/types";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/lib/persistStore";

const rootReducer = combineReducers({ productsReducer, usersReducer });

const persistConfig: PersistConfig<any> = {
    key: "root",
    storage,
    whitelist: ["productsReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const peteThePersistor = persistStore(store);

export default store;
