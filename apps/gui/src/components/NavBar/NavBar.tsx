import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@repo/ui/navigation-menu";
import { cn } from "@repo/ui/utils";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

import UserButton from "./UserButton";

export default function NavBar() {
    const { t } = useTranslation("general");
    const { data } = trpc.project.isOpen.useQuery();

    const noProject = !data;

    return (
        <div className="flex justify-between items-center gap-4 px-4 py-2 border-b bg-background">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link
                            className={navigationMenuTriggerStyle()}
                            draggable={false}
                            to="/"
                        >
                            {t("home")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem asChild>
                        <Link
                            className={cn(
                                navigationMenuTriggerStyle(),
                                noProject &&
                                    "text-muted hover:bg-background hover:text-muted"
                            )}
                            disabled={noProject}
                            draggable={false}
                            to="/project"
                        >
                            {t("project")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem asChild>
                        <Link
                            className={cn(
                                navigationMenuTriggerStyle(),
                                noProject &&
                                    "text-muted hover:bg-background hover:text-muted"
                            )}
                            disabled={noProject}
                            draggable={false}
                            to="/results"
                        >
                            {t("results")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem asChild>
                        <Link
                            activeProps={{
                                className: "font-bold",
                            }}
                            className={navigationMenuTriggerStyle()}
                            draggable={false}
                            to="/libraries"
                        >
                            Libraries
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div>
                <UserButton />
            </div>
        </div>
    );
}
