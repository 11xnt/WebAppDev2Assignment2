import React, { useState} from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import VideocamIcon from "@material-ui/icons/Videocam";
import NumbersIcon from "@material-ui/icons/FormatListNumbered";
import StarRate from "@material-ui/icons/StarRate";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(1.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const TvDetails = ({ tv }) => {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tv.overview}
            </Typography>

            <Paper component="ul" className={classes.root}>
                <li>
                    <Chip label="Genres" className={classes.chip} color="primary" />
                </li>
                {tv.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} className={classes.chip} />
                    </li>
                ))}
            </Paper>

            <Paper component="ul" className={classes.root}>
                <Chip icon={<NumbersIcon />} label={`${tv.number_of_episodes} episodes.`} />
                <Chip
                    icon={<VideocamIcon />}
                    label={`In Production: ${tv.in_production.toLocaleString()}`}

                />
                <Chip
                    icon={<StarRate />}
                    label={`${tv.vote_average} (${tv.vote_count}`}
                />
                <Chip label={`Released: ${tv.first_air_date}`} />
            </Paper>

            <Fab
                color="secondary"
                variant="extended"
                className={classes.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
        </>
    );
};
export default  TvDetails;