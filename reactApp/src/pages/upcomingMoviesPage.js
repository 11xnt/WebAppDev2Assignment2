import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'
import {getUpcomingMovies} from "../api/tmdb-api";

const UpcomingMoviesPage = (props) => {
    const {  data, error, isLoading, isError }  = useQuery('discover3', getUpcomingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies1 = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies1.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    const addToFavorites = (movieId) => true

    return (
        <PageTemplate
            title='Upcoming Movies'
            movies={movies1}
            action={(movie) => {
                return <AddToWatchListIcon movie={movie} />
            }}
        />
    );
};
export default UpcomingMoviesPage;