import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        id: null,
        userName: null,
        email: null,
        photoURL: null
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
        }
    }
})

export const { setActiveUser, setUserLogOutState } = userSlice.actions;
export default userSlice.reducer;