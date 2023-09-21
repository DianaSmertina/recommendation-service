import {
    combineReducers,
    configureStore,
    PreloadedState,
} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import reviewsReducer from "./reviewsSlice";
import { reviewsApi } from "./reviewsApi";

const rootReducer = combineReducers({
    user: userReducer,
    reviews: reviewsReducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reviewsApi.middleware),
        preloadedState,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
