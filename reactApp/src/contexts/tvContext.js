import React, {useEffect, useReducer, useState} from "react";
import {getTvShows} from "../api/movie-api";

export const TvContext = React.createContext(null);

const reducer = (state, action) => {
    switch (action.type) {
        case "load":
            return { tvshows: action.payload.result};
        default:
            return state;
    }
};

const TvContextProvider = (props) => {

    const [favoritesTV, setFavoritesTV] = useState( [] )
    const [state, dispatch] = useReducer(reducer, { movies: []});
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        getTvShows().then(result => {
            console.log(result);
            dispatch({ type: "load", payload: {result}});
        });
    },[]);

    const addToFavoritesTV = (tv) => {
        setFavoritesTV([...favoritesTV,tv.id])
    };
    // We will use this function in a later section
    const removeFromFavoritesTV = (tv) => {
        setFavoritesTV( favoritesTV.filter(
            (mId) => mId !== tv.id
        ) )
    };

    return (
        <TvContext.Provider
            value={{
                tvshows: state.tvshows,
                setAuthenticated,
                favoritesTV,
                addToFavoritesTV,
                removeFromFavoritesTV,
            }}
        >
            {props.children}
        </TvContext.Provider>
    );
};

export default TvContextProvider;