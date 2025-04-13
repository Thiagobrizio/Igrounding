import { type Column } from "@tanstack/react-table";
import { CheckIcon, PlusCircle } from "lucide-react";

import { cn } from "../../lib/utils";
import { Badge } from "../badge";
import { Button } from "../button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Separator } from "../separator";

interface Option {
    label: string;
    value: string;
}

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    title?: string;
    defaultFilters?: number[];
    options: Option[];
}

export default function DataTableFacetedFilter<TData, TValue>({
    column,
    title,
    options,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const selectedValues = new Set(column?.getFilterValue() as string[]);
    const totalOptions = options.length;

    function selectItem(option: Option, isSelected: boolean) {
        if (isSelected) {
            selectedValues.delete(option.value);
        } else {
            selectedValues.add(option.value);
        }
        const filterValues = Array.from(selectedValues);
        column?.setFilterValue(filterValues.length ? filterValues : undefined);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className="h-8 border-dashed"
                    size="sm"
                    variant="outline"
                >
                    <PlusCircle />
                    {title}
                    {selectedValues.size > 0 && (
                        <>
                            <Separator
                                className="mx-2 h-4"
                                orientation="vertical"
                            />
                            <div className="space-x-1">
                                {selectedValues.size > 1 ? (
                                    <Badge
                                        className="rounded-sm px-1 font-normal"
                                        variant="secondary"
                                    >
                                        {selectedValues.size === totalOptions
                                            ? "All selected"
                                            : `${selectedValues.size} selected`}
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) =>
                                            selectedValues.has(option.value)
                                        )
                                        .map((option) => (
                                            <Badge
                                                className="rounded-sm px-1 font-normal"
                                                key={option.value}
                                                variant="secondary"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(
                                    option.value
                                );
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            selectItem(option, isSelected);
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <CheckIcon className="h-4 w-4" />
                                        </div>

                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
