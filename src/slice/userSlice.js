import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db, { auth, provider } from "../firebase";
import firebase from "firebase";


export const loginWithEmailPasswordAction = createAsyncThunk("userSlice/loginWithEmailPasswordAction",
    async (state) => {
        try {
            auth
                .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            const res = await auth.signInWithEmailAndPassword(state.email, state.password);
            const data = res;
            return data;

        }
        catch (error) {
            throw Error(error);
        }
    })

export const loginGoogleAction =
    createAsyncThunk("userSlice/loginGoogleAction", async () => {
        try {
            auth
                .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            const res = await auth.signInWithPopup(provider);
            const data = res;
            return data;
        }
        catch (error) {

            throw Error(error);
        }
    })
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        id: null,
        userName: null,
        email: null,
        photoURL: null,
        errorMessage: null
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
            sessionStorage.clear()
        }
    },
    extraReducers: {
        [loginGoogleAction.pending]: (state, action) => {
            state.status = "loading"
        },
        [loginGoogleAction.fulfilled]: (state, { payload }) => {
            state.status = "success"
            state.id = payload.user.uid;
            state.userName = payload.user.displayName;
            state.photoURL = payload.user.photoURL;
            state.email = payload.user.email;

        },
        [loginGoogleAction.rejected]: (state, { error }) => {
            state.errorMessage = error.message;
            state.status = "failed"
        },
        [loginWithEmailPasswordAction.pending]: (state, action) => {
            state.status = "loading"
        },
        [loginWithEmailPasswordAction.fulfilled]: (state, { payload }) => {
            state.status = "success"
            state.id = payload.user.uid;
            state.userName = payload.user.displayName;
            state.photoURL = payload.user.photoURL;
            state.email = payload.user.email;

        },
        [loginWithEmailPasswordAction.rejected]: (state, { error }) => {
            state.errorMessage = error.message;
            state.status = "failed"
        },

    }
})

export const { setActiveUser, setUserLogOutState, setFavoritesList } = userSlice.actions;
export default userSlice.reducer;