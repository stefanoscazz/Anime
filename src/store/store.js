import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../slice/searchSlice";
import topAnimeSlice from "../slice/topAnimeSlice";



export default configureStore({
    reducer: {
        top: topAnimeSlice,
        search: searchSlice
    },
})