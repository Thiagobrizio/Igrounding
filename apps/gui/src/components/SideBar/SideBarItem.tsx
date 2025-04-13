import { buttonVariants } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";
import { Link } from "@tanstack/react-router";
import { type LucideProps } from "lucide-react";

export interface SideBarItemProps {
    to: string; // TODO: fix type to tanstack router
    text: string;
    icon: React.FC<LucideProps>;
}

export default function SideBarItem(props: SideBarItemProps) {
    return (
        <Link
            activeOptions={{
                exact: true,
            }}
            activeProps={{
                className: cn(
                    buttonVariants({ variant: "default" }),
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start"
                ),
            }}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start"
            )}
            to={props.to}
        >
            <props.icon className="mr-2  size-5" />
            {props.text}
        </Link>
    );
}
