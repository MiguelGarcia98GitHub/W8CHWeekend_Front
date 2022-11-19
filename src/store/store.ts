import { configureStore } from "@reduxjs/toolkit";
import { characterReducer } from "../reducer/reducer";

export const appStore = configureStore({
    reducer: {
        robots: characterReducer,
    },
});

export type rootStore = typeof appStore;

export type rootState = ReturnType<typeof appStore.getState>;
