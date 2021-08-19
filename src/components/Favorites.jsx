import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { removeFromList, updateComment } from "../slice/favoritesSlice";
import { isEmpty } from "lodash";
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";






export const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const user = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("")
    const [titleAnimeClicked, setTitleAnimeClicked] = useState(null)

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
                    <div style={{ margin: "20px", background: "#f0f0f1", borderRadius: "10px", padding: "50px", display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                        <div style={{ width: "200px" }}>
                            <img src={el.img_url} style={{ height: "150px", width: "100px" }} alt="" />
                            <Typography variant="subtitle1" color="textSecondary">{el.title}</Typography>
                        </div>
                        <div style={{ width: "200px", display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: "column" }}>
                            <Typography variant="h6" color="textSecondary">
                                Description
                            </Typography>
                            <Typography style={{ height: "100px" }} variant="subtitle2" color="textSecondary">
                                {el.description.slice(0, 100)}{" "}
                                <Link to={{ pathname: `/description/${el.id}` }}>
                                    {" "}
                                    Continue reading...
                                </Link>
                            </Typography>

                        </div>
                        <div>

                        </div>
                        <div style={{ width: "200px", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "space-around" }} >
                            <Typography variant="h6" color="textSecondary">Comment</Typography>
                            <Typography style={{ height: "100px", maxWidth: "200px" }} variant="subtitle2" color="textSecondary">{el.comment}</Typography>


                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                                        onChange={onChangeComment}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={10}
                                        maxWidth="xl"
                                        variant="outlined"

                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {
                                        setOpen(false);
                                    }} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => {
                                        db.collection("user").doc(user.id).collection("preferiti").doc(titleAnimeClicked).update({
                                            "comment": comment,
                                        })
                                        dispatch(updateComment({
                                            title: titleAnimeClicked,
                                            comment
                                        }))

                                        setOpen(false);


                                    }} color="primary">
                                        Add
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
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
            <div>
                <h1>
                    empty list
                </h1>
            </div>
        )
    }
}
