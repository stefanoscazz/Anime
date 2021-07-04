import { configureStore } from "@reduxjs/toolkit";
import descriptionSlice from "../slice/descriptionSlice";
import favoritesSlice from "../slice/favoritesSlice";
import searchSlice from "../slice/searchSlice";
import topAnimeSlice from "../slice/topAnimeSlice";
import userSlice from "../slice/userSlice";


export default configureStore({
    reducer: {
        top: topAnimeSlice,
        search: searchSlice,
        user: userSlice,
        description: descriptionSlice,
        favorites: favoritesSlice,

    },
})