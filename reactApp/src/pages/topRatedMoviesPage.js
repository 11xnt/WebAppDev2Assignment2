import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'
import { getTopRatedMovies } from "../api/tmdb-api";

const TopRatedMoviesPage = (props) => {
    const {  data, error, isLoading, isError }  = useQuery('discover1', getTopRatedMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies2 = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies2.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    const addToFavorites = (movieId) => true

    return (
        <PageTemplate
            title='Top Rated Movies'
            movies={movies2}
            action={(movie) => {
                return <AddToWatchListIcon movie={movie} />
            }}
        />
    );
};
export default TopRatedMoviesPage;