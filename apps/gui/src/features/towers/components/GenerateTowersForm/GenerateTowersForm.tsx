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
    defaultGenerateTowers,
    type GenerateTowersFormInput,
    generateTowersFormSchema,
} from "@repo/validators/forms/TransmissionTower.schema";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import TowerGeometrySelect from "~/features/towerGeometries/components/TowerGeometrySelect";
import trpc from "~/utils/trpc";

interface BaseFormProps {
    lineId: LineID;
    onFinish?: () => void;
}

export default function GenerateTowersForm({
    lineId,
    onFinish,
}: BaseFormProps) {
    const { t } = useTranslation("generateTowersForm");
    const utils = trpc.useUtils();

    const form = useForm({
        schema: generateTowersFormSchema,
        values: defaultGenerateTowers,
    });
    const generateMutation = trpc.tower.generate.useMutation({
        async onSuccess(values) {
            toast.success(`${values.length} generated successfully`);
            await utils.tower.getAllByLineId.invalidate({
                lineId,
            });
            if (onFinish) onFinish();
        },
    });

    function handleValid(values: GenerateTowersFormInput) {
        generateMutation.mutate({ ...values, lineId });
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
                    name="namePrefix"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("namePrefix.label")}</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("namePrefix.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="geometryId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("geometryId.label")}</FormLabel>
                                <FormControl>
                                    <TowerGeometrySelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("geometryId.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="numTowers"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("numTowers.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("numTowers.description")}
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
                <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("distance.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("distance.description")}
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
