import { Button } from "@repo/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@repo/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import { cn } from "@repo/ui/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Data = {
    id: string;
    name: string;
} & Record<string, unknown>;

export interface BaseSelectProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    data: Data[];
    onChange?: (value: string | number | readonly string[] | undefined) => void;
}

const BaseSelect = forwardRef<HTMLButtonElement, BaseSelectProps>(
    ({ data, value, onChange, ...props }, ref) => {
        const { t } = useTranslation("baseSelect");
        const [open, setOpen] = useState(false);

        function handleSelect(currentValue: typeof value) {
            if (onChange) {
                onChange(currentValue === value ? "" : currentValue);
            }
            setOpen(false);
        }

        const selectedName = useMemo(() => {
            if (value) {
                const currentOption = data.find(
                    (options) => options.id === value
                );

                if (!currentOption) {
                    console.log({ data, value });
                    throw new Error("Can't find option.");
                }

                return currentOption.name;
            }

            return t("select");
        }, [data, t, value]);

        return (
            <Popover modal onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                    <Button
                        aria-expanded={open}
                        className="justify-between w-full"
                        ref={ref}
                        role="combobox"
                        variant="outline"
                        {...props}
                    >
                        {selectedName}
                        <ChevronsUpDown className=" ml-2 flex-shrink-0 w-4 h-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Command>
                        <CommandInput placeholder={t("search")} />
                        <CommandEmpty>{t("noneFound")}</CommandEmpty>
                        <CommandList>
                            <CommandGroup>
                                {data.map((conductorType) => {
                                    return (
                                        <CommandItem
                                            key={conductorType.id}
                                            keywords={[conductorType.name]}
                                            onSelect={handleSelect}
                                            value={conductorType.id}
                                        >
                                            <Check
                                                className={cn(
                                                    "w-4 h-4 mr-2",
                                                    value === conductorType.id
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {conductorType.name}
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
);

BaseSelect.displayName = "BaseSelect";

export default BaseSelect;
