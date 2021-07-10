import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const searchAction = createAsyncThunk("searchSlice/searchAction", async (inputValue) => {

    const url = `https://api.jikan.moe/v3/search/anime?q=${inputValue}&page=1`
    try {
        const data = await axios.get(url)
        return data.data;
    }
    catch (error) {
        throw Error(error);
    }
})

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        list: null,
        status: null
    },
    extraReducers: {
        [searchAction.pending]: (state, action) => {
            state.status = "loading"
        },
        [searchAction.fulfilled]: (state, { payload }) => {
            state.status = "success"
            state.list = payload.results.slice(0, 12);
        },
        [searchAction.rejected]: (state) => {
            state.status = "failed"
        }
    }

})
export default searchSlice.reducer