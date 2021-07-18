import React from 'react'
import { useSelector } from 'react-redux';
import { CardAnime } from './CardAnime';
import CircularProgress from "@material-ui/core/CircularProgress";
import TopAnime from './TopAnime';
import { Grid, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    container: {
        color: theme.palette.text.secondary,
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    },

}));
const SearchAnime = () => {
    const search = useSelector(state => state.search)
    const classes = useStyles();

    if (search.status === "loading") {
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <CircularProgress size="100px" />
                </Grid>
            </Container>
        )
    }
    if (search.status === "failed") {
        return <TopAnime />
    }
    if (search.status === "success") {
        return <CardAnime data={search.list} />;
    }
    return null
}

export default SearchAnime
