import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { removeFromList, updateComment } from "../slice/favoritesSlice";
import { isEmpty } from "lodash";
import { Button, Container, TextField, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    boxFavorite: {
        margin: "20px",
        background: "#f0f0f1",
        borderRadius: "10px",
        padding: "50px",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        [theme.breakpoints.down('sm')]: {

        },
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
        },
    },
    boxDescription: {
        width: "200px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"

    },
    boxCover: {
        width: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column"

    },
    boxRemove: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    boxChangeComment: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "8px",
        [theme.breakpoints.down('sm')]: {

        },
    },
    boxComment: {
        width: "200px", display: "flex", alignItems: "center", flexDirection: "column",
    },
    boxFavoritesEmpty: {
        isplay: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));





export const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const user = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("")
    const [titleAnimeClicked, setTitleAnimeClicked] = useState(null)
    const [helper, setHelper] = useState("")
    const classes = useStyles();


    const handleClose = () => {
        setOpen(false);

    };

    const onChangeComment = (e) => {
        setComment(e.target.value)

    }
    if (!isEmpty(favorites.list) && favorites.status === "success") {
        return (
            <Container>
                {favorites.list.map(el => (
                    <div className={classes.boxFavorite}>
                        <div calssName={classes.boxCover} >
                            <img src={el.img_url} style={{ height: "150px", width: "100px" }} alt="" />
                            <Typography style={{ width: "100px" }} variant="subtitle1" color="textSecondary">{el.title.slice(0, 20) + "..."}</Typography>
                        </div>
                        <div className={classes.boxDescription} >
                            <Typography variant="h6" color="textSecondary">
                                Description
                            </Typography>
                            <Typography style={{ height: "100px" }} variant="subtitle2" color="textSecondary">
                                {el.description.slice(0, 80)}{" "}
                                <Link to={{ pathname: `/description/${el.id}` }}>
                                    {" "}
                                    Continue reading...
                                </Link>
                            </Typography>

                        </div>
                        <div>

                        </div>
                        <div className={classes.boxComment} style={{}} >
                            <Typography variant="h6" color="textSecondary">Comment</Typography>
                            <Typography style={{ maxWidth: "200px" }} variant="subtitle2" color="textSecondary">{el.comment}</Typography>


                        </div>
                        <div className={classes.boxChangeComment} >
                            <Button variant="outlined" color="primary" onClick={() => {
                                setOpen(true);
                                setTitleAnimeClicked(el.title)
                            }}>
                                add or change comments
                            </Button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Coomment</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        placeholder="max 300 characters"
                                        onChange={onChangeComment}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={10}
                                        maxWidth="xl"
                                        variant="outlined"
                                        helperText={helper}

                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {
                                        setOpen(false);
                                    }} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => {
                                        if (comment.length <= 300) {
                                            setHelper("")
                                            db.collection("user").doc(user.id).collection("preferiti").doc(titleAnimeClicked).update({
                                                "comment": comment,
                                            })
                                            dispatch(updateComment({
                                                title: titleAnimeClicked,
                                                comment
                                            }))

                                            setOpen(false);
                                        } else {
                                            setHelper("you used too many characters")

                                        }
                                        console.log(comment.length)


                                    }} color="primary">
                                        Add
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div className={classes.boxRemove} >
                            <Button
                                size="small"
                                onClick={() => {
                                    db.collection("user")
                                        .doc(user.id)
                                        .collection("preferiti")
                                        .doc(el.title)
                                        .delete()
                                    dispatch(removeFromList(el.title))
                                }}
                                variant="contained"
                                color="secondary"
                            >
                                Remove
                            </Button>
                        </div>
                    </div>

                ))}
            </Container>
        )
    } else if (isEmpty(favorites.list)) {
        return (
            <div className={classes.boxFavoritesEmpty} >
                <Typography variant="h3" color="textSecondary">
                    Empty list
                </Typography>
            </div>
        )
    }
}
