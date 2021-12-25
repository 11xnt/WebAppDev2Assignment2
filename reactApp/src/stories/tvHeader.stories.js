import React from "react";
import TvHeader from "../components/headerTv";
import SampleTV from "./sampleTV";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";

export default {
    title: "TV Details/TvHeader",
    component: TvHeader,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    ],
};

export const Basic = () => <TvHeader tv={SampleTV} />;

Basic.storyName = "Default";