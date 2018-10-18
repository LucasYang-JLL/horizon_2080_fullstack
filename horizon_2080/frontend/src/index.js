import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RootContainer from "./components/_containers/RootContainer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./components/_reducers/rootReducer";
import registerServiceWorker from "./registerServiceWorker";
// redux persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ['language']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// redux store
let store = createStore(persistedReducer);
let persistor = persistStore(store);
// react-intl translation config

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RootContainer />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
