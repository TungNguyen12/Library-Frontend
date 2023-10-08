import {
    AnyAction,
    Reducer,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cardReducer";
import authReducer from "./reducers/authReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import { PersistConfig } from "redux-persist/lib/types";
import storage from "redux-persist/lib/storage";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist";

const rootReducer = combineReducers({
    productsReducer,
    usersReducer,
    cartReducer,
    authReducer,
    categoriesReducer,
});

const persistConfig: PersistConfig<any> = {
    key: "root",
    storage,
    blacklist: ["productsReducer", "usersReducer", "authReducer"],
};

const persistedReducer: Reducer<AppState, AnyAction> = persistReducer(
    persistConfig,
    rootReducer
);

export const createStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
    });
};

const store = createStore();

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const peteThePersistor = persistStore(store);

export default store;
