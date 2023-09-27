import {
    AnyAction,
    Reducer,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/userReducer";
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
import cartReducer from "./reducers/cardReducer";

const rootReducer = combineReducers({
    productsReducer,
    usersReducer,
    cartReducer,
});

const persistConfig: PersistConfig<any> = {
    key: "root",
    storage,
    blacklist: ["productsReducer", "usersReducer"],
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
