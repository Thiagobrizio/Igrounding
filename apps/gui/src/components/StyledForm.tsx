import type React from "react";

export function StyledForm({
    children,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    return (
        <form aria-label="form" className="flex flex-col gap-6" {...props}>
            {children}
        </form>
    );
}

export function ButtonsWrapper({
    children,
}: React.ComponentPropsWithoutRef<"div">) {
    return <div className="flex gap-4 justify-end">{children}</div>;
}
