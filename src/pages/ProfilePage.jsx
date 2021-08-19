import { Button, Grid, Typography, TextField, Container } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth, storage } from '../firebase'
import { changeUsername, imgUrl } from '../slice/userSlice'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import { Favorites } from '../components/Favorites'
import { Redirect } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    headProfile: {
        background: "#3f51b5",
        color: "white",
        minHeight: "170px",
        alignItems: "center",
        justifyContent: "center",
    },
    root: {
        width: 500,
    },
    gridContainer: {
        alignItems: "center",
        marginTop: theme.spacing(5),
        justifyContent: "center",
    },
    uploadContainer: {
        marginLeft: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    containerSetting: {
        display: "flex",
        marginTop: "50px",
        minHeight: "250px",
        padding: "20px",

        [theme.breakpoints.down('sm')]: {
            flexWrap: "wrap"
        }
    },
    profilePage: {
        minHeight: "calc(100vh - 150px)",
        display: "flex",
        flexDirection: "column",

    },
    gridNavigation: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
    }


}));
export const ProfilePage = () => {
    const [value, setValue] = React.useState("settings");
    const classes = useStyles();
    const [image, setimage] = useState(null)
    const [url, setUrl] = useState(null)
    const [userName, setuserName] = useState("")
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setimage(e.target.files[0])
        }
    }
    const handleChangeNavigation = (event, newValue) => {
        setValue(newValue);
    };
    console.log(url)
    const handleUpload = () => {
        if (image) {
            const uploadTask = storage.ref(`images/${user.id}/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error)
                },
                () => {
                    storage.ref(`images/${user.id}`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url)
                            dispatch(imgUrl(url))
                            auth.currentUser.updateProfile({
                                photoURL: url,
                            })
                        })
                }
            )
        }
    }
    const handleClickSetting = () => {
        setValue("settings")
    }
    const handleClickFavorites = () => {
        setValue("favorites")
    }
    const hadleChangeName = (e) => {
        setuserName(e.target.value)
    }
    const handleClickName = () => {
        if (userName.length < 15) {
            dispatch(changeUsername(userName))
            auth.currentUser.updateProfile({
                displayName: userName,
            })
            setuserName("")

        }
    }

    return (
        <div>
            {user.id ? (
                <div className={classes.profilePage} >
                    <Grid container className={classes.headProfile}>
                        {user.photoURL && <img style={{ height: "60px", width: "60px", borderRadius: "60px", margin: "10px" }} src={user.photoURL} alt="" />}
                        {user.userName && <h2>{user.userName.toUpperCase()}</h2>}
                    </Grid>
                    <Grid className={classes.gridNavigation} container style={{}} >
                        <BottomNavigation value={value} onChange={handleChangeNavigation} className={classes.root}>
                            <BottomNavigationAction onClick={handleClickSetting} showLabel={true}
                                label="Settings" value="settings" icon={<SettingsIcon style={{ fontSize: "50px" }} />} />
                            <BottomNavigationAction onClick={handleClickFavorites} showLabel={true}
                                label="Favorites" value="favorites" icon={<FavoriteIcon style={{ fontSize: "50px" }} />} />
                        </BottomNavigation>

                    </Grid>
                    <Container>
                        {
                            value === "settings" ?

                                <div className={classes.containerSetting}>
                                    <Grid container className={classes.gridContainer}>
                                        <div>
                                            <Typography variant="h6" color="textPrimary">
                                                Upload profile image :
                                            </Typography>

                                        </div>
                                        <div className={classes.uploadContainer}>
                                            <input className={classes.inputUpload} lang="en" type="file" onChange={handleChange} />
                                            <Button color="primary" size="small" variant="contained" onClick={handleUpload}>upload</Button>
                                        </div>
                                    </Grid>
                                    <Grid container className={classes.gridContainer}>

                                        <Typography variant="h6" color="textPrimary">
                                            Change Username:
                                        </Typography>

                                        <div className={classes.uploadContainer}>

                                            <TextField value={userName} onChange={hadleChangeName} id="outlined-basic" label="username" variant="outlined" size="small" />
                                            <Button onClick={handleClickName} style={{ marginLeft: "5px" }} color="primary" size="small" variant="contained">change</Button>

                                        </div>
                                    </Grid>
                                </div>
                                :
                                <Favorites />
                        }
                    </Container>

                </div>)
                :
                <Redirect to="/login" />
            }
        </div>
    )
}

