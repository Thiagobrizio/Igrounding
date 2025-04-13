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
import { Input } from "@repo/ui/input";
import toast from "@repo/ui/toast";
import {
    type ConductorLocationFormInput,
    conductorLocationFormSchema,
} from "@repo/validators/forms/ConductorLocation.schema";
import { useTranslation } from "react-i18next";

import { StyledForm } from "~/components/StyledForm";
import trpc from "~/utils/trpc";

interface UpdateConductorLocationFormProps {
    conductorLocationId: number;
    onFinish?: () => void;
}

export default function UpdateConductorLocationForm({
    conductorLocationId,
    onFinish,
}: UpdateConductorLocationFormProps) {
    const { t } = useTranslation("updateConductorLocationForm");
    const utils = trpc.useUtils();
    const [data, query] = trpc.conductorLocations.getById.useSuspenseQuery({
        locationId: conductorLocationId,
    });

    const form = useForm({
        schema: conductorLocationFormSchema,
        values: data,
    });

    const updateMutation = trpc.conductorLocations.update.useMutation({
        async onSuccess(values) {
            toast.success("Conductor location updated");
            await utils.conductorLocations.getAllByGeometryId.invalidate({
                geometryId: values.geometryId,
            });
            if (onFinish) onFinish();
        },
        onError(error) {
            toast.error("Conductor location not updated");
            console.log(error);
        },
    });

    function handleValid(values: ConductorLocationFormInput) {
        updateMutation.mutate({
            ...values,
            id: conductorLocationId,
        });
    }

    if (query.isLoading) {
        return <div>Loading...</div>;
    }
    if (query.isError) {
        return <div>Error</div>;
    }

    return (
        <Form {...form}>
            <StyledForm
                aria-label="updateConductorLocation"
                onSubmit={form.handleSubmit(handleValid)}
            >
                <FormField
                    control={form.control}
                    name="x"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("x.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("x.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="y"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("y.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("y.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <Button type="submit">{t("form:submit")}</Button>
            </StyledForm>
        </Form>
    );
}
