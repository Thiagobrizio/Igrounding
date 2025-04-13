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
    type ConductorTypeFormInput,
    conductorTypeFormSchema,
    defaultConductorType,
} from "@repo/validators/forms/ConductorType.schema";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import trpc from "~/utils/trpc";

interface CreateConductorTypeFormProps {
    onFinish?: () => void;
}

export default function CreateConductorTypeForm({
    onFinish,
}: CreateConductorTypeFormProps) {
    const { t } = useTranslation("createConductorTypeForm");
    const form = useForm({
        schema: conductorTypeFormSchema,
        defaultValues: defaultConductorType,
    });

    const createConductorMutation = trpc.conductorType.create.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been added.`);
            if (onFinish) onFinish();
        },
        onError(error) {
            console.log(error);
            toast.error("Can't add Conductor Type");
        },
    });

    function handleValid(values: ConductorTypeFormInput) {
        createConductorMutation.mutate(values);
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
                    name="surfaceArea"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("surfaceArea.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("surfaceArea.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="outerDiameter"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("outerDiameter.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("outerDiameter.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="coreDiameter"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("coreDiameter.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("coreDiameter.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="stranding"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("stranding.label")}</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("stranding.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="layers"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("layers.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("layers.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="currentCapacity"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("currentCapacity.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("currentCapacity.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="dcResistance25"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("dcResistance25.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("dcResistance25.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="acResistance25"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("acResistance25.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("acResistance25.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="acResistance50"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("acResistance50.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("acResistance50.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="acResistance75"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("acResistance75.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("acResistance75.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="gmr"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("gmr.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("gmr.description")}
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
