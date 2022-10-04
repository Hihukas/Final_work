import {logger} from "redux-logger/src";
import {configureStore} from "@reduxjs/toolkit";
import user from "./slices/user/userSlice";

const buildStore = () => {
    const store = configureStore(
        {
            reducer: {
                user
            },
            middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
        }
    );

    return store;
}

const store = buildStore();

export default store;