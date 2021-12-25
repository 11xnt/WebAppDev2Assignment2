import React from "react";
import TvListHeader from "../components/headerTvList";
import { MemoryRouter } from "react-router";
import TvContextProvider from "../contexts/tvContext";

export default {
    title: "TV/Header",
    component: TvListHeader,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <TvContextProvider>{Story()}</TvContextProvider>,
    ],
};

export const Basic = () => <TvListHeader title={'Discover TV Shows'} />;

Basic.storyName = "Default";