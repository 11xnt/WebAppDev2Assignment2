import React, {useReducer} from 'react';
import { useContext} from 'react';
import { MoviesContext } from './contexts/moviesContext';
import PageTemplate from "./components/templateMovieListPage";
import PageDetailsTemplate from "./components/templateMoviePage";
import AddToFavoritesIcon from "./components/cardIcons/addToFavorites";
import {getMovies, getUpcomingMovies} from "./api/movie-api";

const reducer = (state, action) => {
    switch (action.type) {
        case "load":
            return { movies: action.payload.result};
        default:
            return state;
    }
};

export const PublicPage = () => {
    return <h2>Public page</h2>
}

export const Movies = () => {
    const context = useContext(MoviesContext);
    return <>
        <h2>Movies Data </h2>
        <PageTemplate
            title="Discover Movies"
            movies={context.movies.results}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    </>
}

export const Upcoming = () => {
    const [state, dispatch] = useReducer(reducer, { movies: []});
    getUpcomingMovies().then(result => {
        console.log(result);
        dispatch({ type: "load", payload: {result}});
    });
    const context = useContext(MoviesContext);
    return <>
        <h2>Movies Data </h2>
        <PageTemplate
            title="Upcoming Movies"
            movies={context.movies.results}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    </>
}

export const MovieDetails = () => {
    const context = useContext(MoviesContext);
    return <>
        <h2>My Profile </h2>
        <PageDetailsTemplate movie={context.movies.results}>
            <MovieDetails movie={context.movies.results} />
        </PageDetailsTemplate>
    </>
}

export const HomePage = () => {
    return  <h2>Home page</h2>
}
