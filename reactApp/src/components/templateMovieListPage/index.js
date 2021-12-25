import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";
import {Button, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {QueryClient} from "react-query";

const useStyles = makeStyles({
    root: {
        padding: "20px",
    },
});


export const handleSort = (event) => {
    if (event === 'popularity.desc') {
        QueryClient.refetchQueries();
        return 'popularity.desc'

    } else if (event === 'revenue.desc') {
        QueryClient.refetchQueries();
        return 'revenue.desc'
    } else if (event === 'release_date.desc') {
        QueryClient.refetchQueries();
        return 'release_date.desc'

    }
}

function MovieListPageTemplate({ movies, title, action }) {
    const classes = useStyles();
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const genreId = Number(genreFilter);

    let displayedMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        })

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else setGenreFilter(value);
    };


    return (

        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>
            <Button size="large" onClick={e =>
                window.confirm("Are you a human?")
            }>Confirm</Button>
            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
            </Grid>

            <FormControl component="fieldset">
                <FormLabel component="legend">Sort By</FormLabel>
                <RadioGroup row aria-label="Sort by" name="row-radio-buttons-group">
                    <FormControlLabel value={"popularity.desc"} control={<Radio />} label="Popularity" onChange={handleSort} />
                    <FormControlLabel value={"revenue.desc"} control={<Radio />} label="Revenue" onChange={handleSort}/>
                    <FormControlLabel value={"release_date.desc"} control={<Radio />} label="Release date" onChange={handleSort}/>
                </RadioGroup>
            </FormControl>


        </Grid>
    );
}
export default MovieListPageTemplate;