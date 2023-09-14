import {
    combineReducers,
    configureStore,
    PreloadedState,
} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import reviewGroupsReducer from "./reviewGroupsSlice";

const rootReducer = combineReducers({
    user: userReducer,
    reviewGroups: reviewGroupsReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        preloadedState,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];