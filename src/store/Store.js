import { configureStore } from "@reduxjs/toolkit";
import GeneralReducer from "../reducers/GeneralReducers";

export const MyStore = configureStore({
    reducer: GeneralReducer
});