import type { ConductorID } from "@repo/validators/Ids";

import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
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
    type ConductorFormInput,
    conductorFormSchema,
} from "@repo/validators/forms/Conductor.schema";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import ConductorTypeSelect from "~/features/conductorTypes/components/ConductorTypeSelect";
import trpc from "~/utils/trpc";

interface UpdateConductorFormProps {
    conductorId: ConductorID;
    onFinish?: () => void;
}

export default function UpdateConductorForm({
    conductorId,
    onFinish,
}: UpdateConductorFormProps) {
    const utils = trpc.useUtils();
    const { t } = useTranslation("updateConductorForm");

    const [data, query] = trpc.conductor.getById.useSuspenseQuery({
        id: conductorId,
    });
    const form = useForm({
        schema: conductorFormSchema,
        values: data,
    });

    const updateMutation = trpc.conductor.update.useMutation({
        async onSuccess(values) {
            await utils.conductor.getAll.invalidate({
                lineId: values.lineId,
            });
            toast.success("Conductor updated");
            if (onFinish) onFinish();
        },
        onError(error) {
            toast.error("Conductor not updated");
            console.log(error);
        },
    });

    function handleValid(values: ConductorFormInput) {
        updateMutation.mutate({ ...values, id: conductorId });
    }

    if (query.isLoading) {
        return <div>Loading...</div>;
    }
    if (query.isError || !data) {
        return <div>Error</div>;
    }

    return (
        <Form {...form}>
            <StyledForm onSubmit={form.handleSubmit(handleValid)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("name.label")}</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("name.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="fromPhase"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("fromPhase.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("fromPhase.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="toPhase"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("toPhase.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("toPhase.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="bundleNumber"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("bundleNumber.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("bundleNumber.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="bundleSpacing"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("bundleSpacing.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("bundleSpacing.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="isNeutral"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("isNeutral.label")}</FormLabel>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("isNeutral.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="typeId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("typeId.label")}</FormLabel>
                                <FormControl>
                                    <ConductorTypeSelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("typeId.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <ButtonsWrapper>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
