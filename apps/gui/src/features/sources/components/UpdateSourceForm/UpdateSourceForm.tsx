import type { SourceID } from "@repo/validators/Ids";

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
    type SourceFormInput,
    sourceFormSchema,
} from "@repo/validators/forms/Source.schema";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import trpc from "~/utils/trpc";

interface UpdateSourceFormProps {
    sourceId: SourceID;
    onFinish?: () => void;
}

export default function UpdateSourceForm({
    sourceId,
    onFinish,
}: UpdateSourceFormProps) {
    const { t } = useTranslation("updateSourceForm");
    const navigate = useNavigate();
    const [data, query] = trpc.source.getById.useSuspenseQuery({
        id: sourceId,
    });
    const form = useForm({
        schema: sourceFormSchema,
        values: data,
    });

    const updateSourceMutation = trpc.source.update.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been updated.`);
            await navigate({
                to: "/project/sources",
            });
            if (onFinish) onFinish();
        },
    });

    function handleValid(values: SourceFormInput) {
        updateSourceMutation.mutate({
            ...values,
            id: sourceId,
        });
    }

    if (query.isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (query.isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
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
                    name="name"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("name.label")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("name.placeholder")}
                                        type="text"
                                        {...field}
                                    />
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
                    name="phases"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("phases.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("phases.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("frequency.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("frequency.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="voltage"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("voltage.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("voltage.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="x1r1"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("x1r1.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("x1r1.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="x0r0"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("x0r0.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("x0r0.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="isc3"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("isc3.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("isc3.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="isc1"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("isc1.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("isc1.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="resistance"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("resistance.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("resistance.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <ButtonsWrapper>
                    <Button
                        disabled={!form.formState.isDirty}
                        type="reset"
                        variant="destructive"
                    >
                        {t("form:reset")}
                    </Button>
                    <Button disabled={!form.formState.isDirty} type="submit">
                        {t("form:submit")}
                    </Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
