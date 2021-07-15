import { combineReducers, configureStore } from "@reduxjs/toolkit";
import charactersSlice from "../slice/charactersSlice";
import descriptionSlice from "../slice/descriptionSlice";
import favoritesSlice from "../slice/favoritesSlice";
import searchSlice from "../slice/searchSlice";
import topAnimeSlice from "../slice/topAnimeSlice";
import userSlice from "../slice/userSlice";
import {
    persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    top: topAnimeSlice,
    search: searchSlice,
    user: userSlice,
    description: descriptionSlice,
    favorites: favoritesSlice,
    characters: charactersSlice
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['top', 'search']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export default store;


