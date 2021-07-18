import React from 'react'
import { useSelector } from 'react-redux';
import { CardAnime } from './CardAnime';
import CircularProgress from "@material-ui/core/CircularProgress";
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

const TopAnime = () => {
    const top = useSelector(state => state.top);
    const classes = useStyles();

    if (top.status === "loading") {
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
    if (top.status === "failed") {
        return <h1> No connection, please connect and try again</h1>;
    }
    if (top.status === "success") {
        return <CardAnime data={top.list} />;
    }
    return null
}

export default TopAnime
