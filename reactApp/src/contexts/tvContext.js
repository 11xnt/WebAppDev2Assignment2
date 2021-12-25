import React, { useState } from "react";

export const TvContext = React.createContext(null);

const TvContextProvider = (props) => {

    const [favoritesTV, setFavoritesTV] = useState( [] )


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