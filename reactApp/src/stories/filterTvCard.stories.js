import React from "react";
import FilterTvCard from "../components/filterTvCard";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false,
        },
    },
});

export default {
    title: "TV/FilterTVCard",
    component: FilterTvCard,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => (
            <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
        ),
    ],
};

export const Basic = () => {
    return <FilterTvCard onUserInput={action("filter input")} />;
};
Basic.storyName = "Default";