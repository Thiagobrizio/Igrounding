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
    defaultGenerateFormConductors,
    type GenerateConductorsFormInput,
    generateConductorsFormSchema,
} from "@repo/validators/forms/Conductor.schema";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import ConductorTypeSelect from "~/features/conductorTypes/components/ConductorTypeSelect";
import trpc from "~/utils/trpc";

interface GenerateConductorsFormProps {
    lineId: LineID;
    onFinish?: () => void;
}

export default function GenerateConductorsForm({
    lineId,
    onFinish,
}: GenerateConductorsFormProps) {
    const { t } = useTranslation("generateConductorsForm");

    const form = useForm({
        schema: generateConductorsFormSchema,
        values: defaultGenerateFormConductors,
    });
    const utils = trpc.useUtils();
    const generateConductorsMutation = trpc.conductor.generate.useMutation({
        async onSuccess(data) {
            toast.success(`${data.length} Conductors successfully generated`);
            await utils.conductor.getAll.invalidate({
                lineId,
            });
            if (onFinish) onFinish();
        },
        onError(error) {
            toast.error("Can't generate conductors");
            console.log(error);
        },
    });

    function handleValid(values: GenerateConductorsFormInput) {
        generateConductorsMutation.mutate({
            ...values,
            lineId,
        });
    }

    return (
        <Form {...form}>
            <StyledForm onSubmit={form.handleSubmit(handleValid)}>
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
                    name="circuits"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("circuits.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("circuits.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="neutrals"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("neutrals.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("neutrals.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="phaseTypeId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("phaseConductorType.label")}
                                </FormLabel>
                                <FormControl>
                                    <ConductorTypeSelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("phaseConductorType.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="neutralTypeId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("neutralConductorType.label")}
                                </FormLabel>
                                <FormControl>
                                    <ConductorTypeSelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("neutralConductorType.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <ButtonsWrapper>
                    <Button type="submit">{t("form:generate")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
