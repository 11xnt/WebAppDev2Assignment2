import React from "react";
import TvCard from "../components/tvCard";
import SampleTv from "./sampleTV";
import { MemoryRouter } from "react-router";
import TvContextProvider from "../contexts/tvContext";
import { action } from "@storybook/addon-actions";
import AddToFavoritesIconTV from "../components/cardIcons/addToFavoritesTV";

export default {
    title: "TV/TvCard",
    component: TvCard,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <TvContextProvider>{Story()}</TvContextProvider>,
    ],
};

export const Basic = () => {
    return (
        <TvCard
            tv={SampleTv}
            action={(tv) => <AddToFavoritesIconTV tv={tv} />}
            taging={(tv) => null}
        />
    );
};
Basic.storyName = "Default";

export const Exceptional = () => {
    const sampleNoPoster = { ...SampleTv, poster_path: undefined };
    return (
        <TvCard
            tv={sampleNoPoster}
            action={(tv) => <AddToFavoritesIconTV tv={tv} />}
            taging={(tv) => null}
        />
    );
};
Exceptional.storyName = "exception";