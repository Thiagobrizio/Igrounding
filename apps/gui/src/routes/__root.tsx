import { TooltipProvider } from "@repo/ui/tooltip";
import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

import NavBar from "~/components/NavBar";
import StatusBar from "~/components/StatusBar";

export const Route = createRootRoute({
    component: DefaultLayout,
});

export function DefaultLayout() {
    return (
        <div className="h-full w-full grid grid-rows-[auto_1fr_auto]">
            <TooltipProvider>
                <NavBar />
                <Outlet />
                <StatusBar />
                <Toaster closeButton position="bottom-right" richColors />
                {/* <TanStackRouterDevtools /> */}
            </TooltipProvider>
        </div>
    );
}
