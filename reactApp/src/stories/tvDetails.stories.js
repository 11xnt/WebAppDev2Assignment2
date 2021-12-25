import React from "react";
import TvDetails from "../components/tvDetails";
import SampleTv from "./sampleTV";
import { MemoryRouter } from "react-router";
import TvContextProvider from "../contexts/tvContext";


export default {
    title: "TV Details/TvDetails",
    component: TvDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <TvContextProvider>{Story()}</TvContextProvider>,
    ],
};

export const Basic = () => <TvDetails tv={SampleTv} />;

Basic.storyName = "Default";