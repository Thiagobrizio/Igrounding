import { Button } from "@repo/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui/form";
import { useForm } from "@repo/ui/hooks/use-form";
import toast from "@repo/ui/toast";
import {
    defaultSolution,
    type SolutionFormInput,
    solutionFormSchema,
} from "@repo/validators/forms/Solution.schema";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import SourceSelect from "~/features/sources/components/SourceSelect";
import TowerSelect from "~/features/towers/components/TowerSelect";
import trpc from "~/utils/trpc";

export default function FaultLocationForm() {
    const utils = trpc.useUtils();

    const form = useForm({
        schema: solutionFormSchema,
        values: defaultSolution,
    });
    const solveMutation = trpc.solution.solve.useMutation({
        async onSuccess() {
            toast.success(`Solved`);
            await utils.solution.hasSolution.invalidate();
        },
        onError: () => {
            toast.error("Can't solve");
        },
    });

    function handleValid(values: SolutionFormInput) {
        solveMutation.mutate(values);
    }

    return (
        <Form {...form}>
            <StyledForm
                onReset={() => {
                    form.reset();
                }}
                onSubmit={form.handleSubmit(handleValid)}
            >
                <FormField
                    control={form.control}
                    name="sourceId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Source</FormLabel>
                                <FormControl>
                                    <SourceSelect
                                        {...field}
                                        onChange={(value) => {
                                            form.setValue("towerId", "");
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                OR
                <FormField
                    control={form.control}
                    name="towerId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Tower</FormLabel>
                                <FormControl>
                                    <TowerSelect
                                        {...field}
                                        {...field}
                                        onChange={(value) => {
                                            form.setValue("sourceId", "");
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <ButtonsWrapper>
                    <Button
                        disabled={
                            !form.getValues().sourceId &&
                            !form.getValues().towerId
                        }
                        type="submit"
                    >
                        Solve
                    </Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
