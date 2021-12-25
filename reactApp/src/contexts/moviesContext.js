import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [myReviews, setMyReviews] = useState( {} )
    const [favorites, setFavorites] = useState( [] )
    const [watchLists, setWatchList] = useState( [] )

    const addToFavorites = (movie) => {
        setFavorites([...favorites,movie.id])
    };
    // We will use this function in a later section
    const removeFromFavorites = (movie) => {
        setFavorites( favorites.filter(
            (mId) => mId !== movie.id
        ) )
    };

    const addToWatchList = (movie) => {
        setWatchList([...watchLists,movie.id])
        console.log([...watchLists,movie.id]);
    };


    // We will use this function in a later section
    const removeFromWatchLists = (movie) => {
        setWatchList( watchLists.filter(
            (mId) => mId !== movie.id
        ) )
    };

    const addReview = (movie, review) => {
        setMyReviews( {...myReviews, [movie.id]: review } )
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                addReview,
                addToWatchList,
                removeFromWatchLists,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;