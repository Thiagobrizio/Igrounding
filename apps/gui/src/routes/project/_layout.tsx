import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Factory, SquareTerminal, UtilityPole } from "lucide-react";

import SideBar from "~/components/SideBar";

export const Route = createFileRoute("/project/_layout")({
    component: ProjectPage,
});

const items = [
    {
        to: "/project/",
        icon: SquareTerminal,
        text: "Diagram",
    },
    {
        to: "/project/sources",
        icon: Factory,
        text: "Sources",
    },
    {
        to: "/project/lines",
        icon: UtilityPole,
        text: "Transmission Lines",
    },
];

export default function ProjectPage() {
    return (
        <div className="flex">
            <SideBar items={items} />
            <div className="w-full h-full p-4">
                <Outlet />
            </div>
        </div>
    );
}
