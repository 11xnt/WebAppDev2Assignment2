import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { TvContext } from "../../contexts/tvContext";

const RemoveFromFavoritesIconTV = ({ tv }) => {
    const context = useContext(TvContext);

    const handleRemoveFromFavoritesTV = (e) => {
        e.preventDefault();
        context.removeFromFavoritesTV(tv);
    };
    return (
        <IconButton
            aria-label="remove from favorites"
            onClick={handleRemoveFromFavoritesTV}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromFavoritesIconTV;