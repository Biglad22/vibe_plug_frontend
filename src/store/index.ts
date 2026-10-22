import { configureStore } from "@reduxjs/toolkit";
import userSessionReducer from "./userSessionSlice";

export const store = configureStore({
    reducer: {
        userSession: userSessionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
