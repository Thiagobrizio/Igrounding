import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Cable, UtilityPole } from "lucide-react";

import SideBar from "~/components/SideBar";

export const Route = createFileRoute("/libraries/_layout")({
    component: ProjectPage,
});

const items = [
    {
        to: "/libraries/tower-geometries",
        icon: UtilityPole,
        text: "Tower Geometries",
    },
    {
        to: "/libraries/conductor-types",
        icon: Cable,
        text: "Conductor Types",
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
