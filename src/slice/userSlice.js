import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        id: null,
        userName: null,
        email: null,
        photoURL: null,
        favorites: []
    },
    reducers: {
        setActiveUser: (state, action) => {

            state.id = action.payload.id;
            state.userName = action.payload.userName;
            state.photoURL = action.payload.photoURL;
            state.email = action.payload.email;

        },
        setUserLogOutState: state => {
            state.id = null;
            state.userName = null;
            state.photoURL = null;
            state.email = null;
            state.favorites.length = 0;
        },
        setFavoritesList: (state, action) => {
            state.favorites = action.payload;
        }
    }
})

export const { setActiveUser, setUserLogOutState, setFavoritesList } = userSlice.actions;
export default userSlice.reducer;