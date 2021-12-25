import React from "react";
import {useQuery} from "react-query";
import {getTvShows} from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateTvListPage";
import AddToFavoritesIconTV from "../components/cardIcons/addToFavoritesTV";

const TvListPage = (props) => {
    const {  data, error, isLoading, isError }  = useQuery('discover2', getTvShows)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const tvs = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favoritesTV = tvs.filter(m => m.favoriteTV)
    localStorage.setItem('favoritesTV', JSON.stringify(favoritesTV))
    const addToFavoritesTV = (tvId) => true

    return (
        <PageTemplate
            title="Discover TV Shows"
            tvs={tvs}
            action={(tv) => {
                return <AddToFavoritesIconTV tv={tv} />
            }}
        />
    );
};
export default TvListPage;