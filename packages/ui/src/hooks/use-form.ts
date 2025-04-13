import type { ZodSchema } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    useForm as _useForm,
    type UseFormProps as _UseFormProps,
    type FieldValues,
} from "react-hook-form";

interface UseFormProps<
    TFieldValues extends FieldValues = FieldValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TContext = any,
> extends Omit<_UseFormProps<TFieldValues, TContext>, "resolver"> {
    schema: ZodSchema<TFieldValues>;
    values?: NoInfer<TFieldValues>;
}

export function useForm<
    TFieldValues extends FieldValues = FieldValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined,
>({ schema, ...props }: UseFormProps<TFieldValues, TContext>) {
    return _useForm<TFieldValues, TContext, TTransformedValues>({
        ...props,
        resolver: zodResolver(schema),
    });
}
