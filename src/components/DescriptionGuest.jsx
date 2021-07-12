import { Button, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(2),
    },
    container: {
        color: theme.palette.text.secondary,
        padding: theme.spacing(3),
        minHeight: "calc(100vh - 150px)"
    },
    main: {
        paddingBottom: theme.spacing(6),
        marginBottom: theme.spacing(6),
        borderBottom: "2px solid black",
    },
}));

export const DescriptionGuest = ({ data }) => {
    const { title,
        duration,
        image_url,
        trailer_url,
        status_anime,
        synopsis,
        episodes,
        title_english,
        title_japanese,
        source,
        score } = data;


    const classes = useStyles();
    const characters = useSelector(state => state.characters)


    return (
        <div>

            <Container maxWidth="lg" className={classes.container}>
                <Grid
                    className={classes.main}
                    xs={12}
                    sm={12}
                    container
                    justifyContent="center"
                >
                    <Grid
                        container
                        justifyContent="center"
                        style={{ flexDirection: "colomn" }}
                        xs={12}
                        sm={6}
                    >
                        <Grid
                            xs={12}
                            sm={6}
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img style={{ maxHeight: "350px" }} src={image_url} alt="" />
                            <Button
                                disabled
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                            >
                                Disabled
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Typography variant="h5">{title}</Typography>
                        <Typography variant="body1" gutterBottom>
                            {synopsis}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container xs={12} sm={12}>
                    <Grid xs={12} sm={3}>
                        <Typography variant="h4">Info</Typography>
                        <Typography variant="body1" gutterBottom>
                            Episodes:{episodes}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Duration: {duration}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Status Anime:{status_anime}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Title English: {title_english}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Title Japanese: {title_japanese}
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            Source: {source}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Score: {score}
                        </Typography>
                    </Grid>
                    <Grid container xs={12} sm={8}>
                        <Typography variant="h4">Main Characters</Typography>
                        <Grid container>
                            {!isEmpty(characters.list) &&
                                characters.list.map((el) => {
                                    return (
                                        <Grid key={el.mal_id}>
                                            <img
                                                style={{ height: "120px" }}
                                                src={el.image_url}
                                                alt=""
                                            />
                                            <p style={{ width: "120px" }}>{el.name}</p>
                                        </Grid>
                                    );
                                })}
                        </Grid>
                        <Grid
                            container
                            style={{ flexDirection: "column", justifyContent: "center" }}
                        >
                            <Typography variant="h4">Trailer</Typography>

                            <iframe width="320" height="230" title={title} src={trailer_url}></iframe>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};
