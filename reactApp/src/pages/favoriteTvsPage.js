import React, { useContext } from "react";
import PageTemplate from "../components/templateTvListPage";
import { TvContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavoritesTV from "../components/cardIcons/removeFromFavoritesTV";

const FavoriteTvsPage = () => {
    const {favoritesTV: tvIds } = useContext(TvContext);

    // Create an array of queries and run in parallel.
    const favoriteTvQueries = useQueries(
        tvIds.map((tvId) => {
            return {
                queryKey: ["tv", { id: tvId }],
                queryFn: getTvShow,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = favoriteTvQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }
    const tvs = favoriteTvQueries.map((q) => q.data);
    const toDo = () => true;

    return (
        <PageTemplate
            title="Favorite TV shows"
            tvs={tvs}
            action={(tv) => {
                return (
                    <>
                        <RemoveFromFavoritesTV tv={tv} />
                    </>
                );
            }}
        />
    );
};

export default FavoriteTvsPage;