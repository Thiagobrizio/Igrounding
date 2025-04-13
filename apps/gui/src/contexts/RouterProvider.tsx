import {
    createHashHistory,
    createRouter,
    RouterProvider as ReactRouterProvider,
} from "@tanstack/react-router";

import { routeTree } from "~/routeTree.gen";
const hashHistory = createHashHistory();

// Create a new router instance
const router = createRouter({ routeTree, history: hashHistory });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export default function RouterProvider() {
    return <ReactRouterProvider router={router} />;
}
