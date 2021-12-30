import React, { useState, createContext, useEffect, useReducer } from "react";
import { getMovies, getUpcomingMovies } from "../api/movie-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
    switch (action.type) {
        case "load":
            return { movies: action.payload.result};
        default:
            return state;
    }
};

const MoviesContextProvider = (props) => {
    const [myReviews, setMyReviews] = useState( {} )
    const [favorites, setFavorites] = useState( [] )
    const [watchLists, setWatchList] = useState( [] )
    const [state, dispatch] = useReducer(reducer, { movies: []});
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {
        getMovies().then(result => {
            console.log(result);
            dispatch({ type: "load", payload: {result}});
        });
    },[]);



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
                movies: state.movies,
                setAuthenticated,
                favorites,
                addToFavorites,
                removeFromFavorites,
                addReview,
                addToWatchList,
                removeFromWatchLists
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;

