import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";


export const charactersAction = createAsyncThunk("descriptionSlice/charactersAction", async (id) => {

    try {
        const url = `https://api.jikan.moe/v3/anime/${id}/characters_staff`;
        const data = await axios.get(url);

        return data.data;

    }
    catch (error) {
        throw Error(error);
    }

})

const charactersSlice = createSlice({
    name: "descriptionSlice",
    initialState: {
        status: null,
        list: null
    },
    extraReducers: {
        [charactersAction.pending]: (state, action) => {
            state.status = "loading"
        },
        [charactersAction.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.list = payload.characters.filter(el => el.role === "Main")
        },
        [charactersAction.rejected]: (state) => {
            state.status = "failed"
        }

    }
})

export default charactersSlice.reducer;