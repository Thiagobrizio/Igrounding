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
    defaultTransmissionLine,
    type TransmissionLineFormInput,
    transmissionLineFormSchema,
} from "@repo/validators/forms";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import SourceSelect from "~/features/sources/components/SourceSelect";
import trpc from "~/utils/trpc";

interface CreateTransmissionLineFormProps {
    onFinish?: () => void;
}

export default function CreateTransmissionLineForm({
    onFinish,
}: CreateTransmissionLineFormProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("createTransmissionLineForm");
    const form = useForm({
        schema: transmissionLineFormSchema,
        values: defaultTransmissionLine,
    });
    const createTransmissionLineMutation =
        trpc.transmissionLine.create.useMutation({
            async onSuccess(data) {
                toast.success(`${data.name} has been added to the project.`);
                await navigate({
                    to: `/project/lines`,
                });
                if (onFinish) onFinish();
            },
            onError(error, variables) {
                toast.error(
                    `Failed to create transmission line: ${variables.name}.`
                );
                console.log(error);
            },
        });

    function handleValid(values: TransmissionLineFormInput) {
        createTransmissionLineMutation.mutate(values);
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
                    <Button type="reset" variant="destructive">
                        {t("form:reset")}
                    </Button>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
