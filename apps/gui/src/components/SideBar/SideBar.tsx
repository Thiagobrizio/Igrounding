import SideBarItem, { type SideBarItemProps } from "./SideBarItem";

interface SideBarProps {
    items: SideBarItemProps[];
}

export default function SideBar({ items }: SideBarProps) {
    return (
        <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 bg-background border-r w-64">
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {items.map((item) => (
                    <SideBarItem key={item.to} {...item} />
                ))}
            </nav>
        </div>
    );
}
