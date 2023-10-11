import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { Provider } from "react-redux";
import store, { peteThePersistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={peteThePersistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
