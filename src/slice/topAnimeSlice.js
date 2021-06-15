import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const url = "https://api.jikan.moe/v3/top/anime"
export const topAnimeAction = createAsyncThunk("dataSlice/topAnimeAction", async () => {
    try {
        const data = await axios.get(url)
        return data.data;
    }
    catch (error) {
        throw Error(error);
    }
})

const topAnimeSlice = createSlice({
    name: "topAnimeSlice",
    initialState: {
        list: null,
        status: null
    },
    extraReducers: {
        [topAnimeAction.pending]: (state, action) => {
            state.status = "loading"
        },
        [topAnimeAction.fulfilled]: (state, { payload }) => {
            state.status = "success"
            state.list = payload.top.slice(0, 10);
        },
        [topAnimeAction.rejected]: (state) => {
            state.status = "failed"
        }
    }

})
export default topAnimeSlice.reducer