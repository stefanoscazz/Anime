import React from 'react'
import { useSelector } from 'react-redux';
import { CardAnime } from './CardAnime';
import CircularProgress from "@material-ui/core/CircularProgress";
import TopAnime from './TopAnime';

const SearchAnime = () => {
    const search = useSelector(state => state.search)

    if (search.status === "loading") {
        return <CircularProgress />;
    }
    if (search.status === "failed") {
        // return displayTopAnime();
        return <TopAnime />
    }
    if (search.status === "success") {
        return <CardAnime data={search.list} />;
    }
    return null
}

export default SearchAnime
