import React, { useContext } from "react";
import { TvContext } from "../../contexts/tvContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const AddToFavoritesIconTV = ({ tv }) => {
    const context = useContext(TvContext);

    const handleAddToFavoritesTV = (e) => {
        e.preventDefault();
        context.addToFavoritesTV(tv);
    };
    return (
        <IconButton aria-label="add to favorites" onClick={handleAddToFavoritesTV}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavoritesIconTV;