import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../Slices/movieSlice";
import componentReducer from "../Slices/componentSlice";

const store = configureStore({
    reducer:{
        movieData : movieReducer,
        componentData : componentReducer

    }
});

export default store;