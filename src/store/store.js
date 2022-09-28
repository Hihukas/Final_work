import project, {loadProjectFromStorage, addProjectToStorage} from "./slices/project/projectSlice";
import {logger} from "redux-logger/src";
import {configureStore} from "@reduxjs/toolkit";

const buildStore = () => {
    const store = configureStore(
        {
            reducer: {
                project
            },
            middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
            preloadedState: {
                project: loadProjectFromStorage()
            }
        }
    );

    addProjectToStorage(store);

    return store;
}

const store = buildStore();

export default store;