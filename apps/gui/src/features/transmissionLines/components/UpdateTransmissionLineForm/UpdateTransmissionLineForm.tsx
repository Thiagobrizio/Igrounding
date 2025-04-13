import type { LineID } from "@repo/validators/Ids";

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
    type TransmissionLineFormInput,
    transmissionLineFormSchema,
} from "@repo/validators/forms/TransmissionLine.schema";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import SourceSelect from "~/features/sources/components/SourceSelect";
import trpc from "~/utils/trpc";

interface UpdateTransmissionLineFormProps {
    lineId: LineID;
    onFinish?: () => void;
}

export default function UpdateTransmissionLineForm({
    lineId,
    onFinish,
}: UpdateTransmissionLineFormProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("updateTransmissionLineForm");

    const [data, query] = trpc.transmissionLine.getById.useSuspenseQuery({
        id: lineId,
    });

    const form = useForm({
        schema: transmissionLineFormSchema,
        values: data,
    });

    const updateTransmissionLineMutation =
        trpc.transmissionLine.update.useMutation({
            async onSuccess(values) {
                toast.success(`${values.name} has been updated.`);
                await navigate({
                    to: "/project/lines",
                });
                if (onFinish) onFinish();
            },
        });

    function handleValid(values: TransmissionLineFormInput) {
        updateTransmissionLineMutation.mutate({ ...values, id: lineId });
    }

    if (query.isLoading) {
        return <div>Loading...</div>;
    }
    if (query.isError || !data) {
        return <div>Error...</div>;
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
                    name="fromSourceId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("fromSource.label")}</FormLabel>
                                <FormControl>
                                    <SourceSelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("fromSource.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="toSourceId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("toSource.label")}</FormLabel>
                                <FormControl>
                                    <SourceSelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("toSource.description")}
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
