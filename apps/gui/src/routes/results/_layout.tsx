import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Factory, ScrollText, SquareTerminal, UtilityPole } from "lucide-react";

import SideBar from "~/components/SideBar";
import trpc from "~/utils/trpc";

export const Route = createFileRoute("/results/_layout")({
    component: ResultsPage,
});

const itemsWithoutSolution = [
    {
        to: "/results/worst-case",
        icon: SquareTerminal,
        text: "Worst Case Scenario",
    },
    {
        to: "/results",
        icon: SquareTerminal,
        text: "Parameters",
    },
];

const itemsWithSolution = [
    {
        to: "/results/worst-case",
        icon: SquareTerminal,
        text: "Worst Case Scenario",
    },
    {
        to: "/results",
        icon: SquareTerminal,
        text: "Parameters",
    },
    {
        to: "/results/sources",
        icon: Factory,
        text: "Sources",
    },
    {
        to: "/results/lines",
        icon: UtilityPole,
        text: "Transmission Lines",
    },
    {
        to: "/results/script",
        icon: ScrollText,
        text: "OpenDSS Script",
    },
];

export default function ResultsPage() {
    const { data, isLoading, isError } = trpc.solution.hasSolution.useQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <div className="flex">
            <SideBar items={data ? itemsWithSolution : itemsWithoutSolution} />
            <div className="w-full h-full p-4">
                <Outlet />
            </div>
        </div>
    );
}
