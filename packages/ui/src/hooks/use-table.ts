import {
    getCoreRowModel,
    type TableOptions,
    useReactTable,
} from "@tanstack/react-table";

type UseTableInput<T> = Omit<TableOptions<T>, "getCoreRowModel">;

export default function useTable<T>(opts: UseTableInput<T>) {
    return useReactTable<T>({
        ...opts,
        getCoreRowModel: getCoreRowModel(),
    });
}
