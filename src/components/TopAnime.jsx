import React from 'react'
import { useSelector } from 'react-redux';
import { CardAnime } from './CardAnime';
import CircularProgress from "@material-ui/core/CircularProgress";


const TopAnime = () => {
    const top = useSelector(state => state.top);

    if (top.status === "loading") {
        return <CircularProgress />;
    }
    if (top.status === "failed") {
        return <h1> No connection, please connect and try again</h1>;
    }
    if (top.status === "success") {
        return <CardAnime data={top.list} />;
    }
    return null
}

export default TopAnime
