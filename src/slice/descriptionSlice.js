import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const descriptionAction = createAsyncThunk("descriptionSlice/descriptionAction", async (id) => {

    const url = `https://api.jikan.moe/v3/anime/${id}`
    try {
        const data = await axios.get(url)

        return data.data;
    }
    catch (error) {
        throw Error(error);
    }
})

const descriptionSlice = createSlice({
    name: "descriptionSlice",
    initialState: {
        status: null,
        duration: null,
        image_url: null,
        trailer_url: null,
        title: null,
        status_anime: null,
        synopsis: null,
        episodes: null,
        title_english: null,
        title_japanese: null,
        source: null,
        score: null
    },
    extraReducers: {
        [descriptionAction.pending]: (state, action) => {
            state.status = "loading"
        },
        [descriptionAction.fulfilled]: (state, { payload }) => {
            state.status = "success"
            state.duration = payload.duration;
            state.image_url = payload.image_url;
            state.trailer_url = payload.trailer_url;
            state.title = payload.title;
            state.status_anime = payload.status;
            state.synopsis = payload.synopsis;
            state.episodes = payload.episodes;
            state.title_english = payload.title_english;
            state.title_japanese = payload.title_japanese;
            state.source = payload.source;
            state.score = payload.score;

        },
        [descriptionAction.rejected]: (state) => {
            state.status = "failed"
        }

    }

})



export default descriptionSlice.reducer