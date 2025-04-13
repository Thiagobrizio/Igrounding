import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/libraries/_layout/")({
    component: ProjectPage,
});

export default function ProjectPage() {
    return (
        <div className="flex">
            <div className="w-full h-full p-4"></div>
        </div>
    );
}
