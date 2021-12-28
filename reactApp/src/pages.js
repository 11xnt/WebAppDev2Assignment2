import React from 'react';
import { useContext} from 'react';
import { MoviesContext } from './contexts/moviesContext';
import PageTemplate from "./components/templateMovieListPage";
import AddToFavoritesIcon from "./components/cardIcons/addToFavorites";

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

export const Profile = () => {
    return <h2>My Profile </h2>
}
export const HomePage = () => {
    return  <h2>Home page</h2>
}
