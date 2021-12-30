import React from "react";
import PageTemplate, {handleSort} from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from "../api/movie-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useContext} from 'react';
import { MoviesContext } from '../contexts/moviesContext';


const HomePage = (props) => {
    const {  data, error, isLoading, isError }  = useQuery(
        ["discover", { id: handleSort()}],
        getMovies
    );
    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    const addToFavorites = (movieId) => true

    return (
        <PageTemplate
            title="Discover Movies"
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};

export default HomePage;