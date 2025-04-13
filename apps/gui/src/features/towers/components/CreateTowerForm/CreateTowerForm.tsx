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
    defaultTransmissionTower,
    type TransmissionTowerFormInput,
    transmissionTowerFormSchema,
} from "@repo/validators/forms/TransmissionTower.schema";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import TowerGeometrySelect from "~/features/towerGeometries/components/TowerGeometrySelect";
import trpc from "~/utils/trpc";

interface CreateTowerFormProps {
    lineId: LineID;
    onFinish?: () => void;
}

export default function CreateTowerForm({
    lineId,
    onFinish,
}: CreateTowerFormProps) {
    const utils = trpc.useUtils();
    const form = useForm({
        schema: transmissionTowerFormSchema,
        values: defaultTransmissionTower,
    });
    const { t } = useTranslation("createTowerForm");

    const createTowerMutation = trpc.tower.create.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been created.`);
            await utils.tower.getAllByLineId.invalidate({
                lineId,
            });
            if (onFinish) onFinish();
        },
        onError(error) {
            toast.error("Can't create Tower");
            console.log(error);
        },
    });

    function handleValid(values: TransmissionTowerFormInput) {
        createTowerMutation.mutate({ ...values, lineId });
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
                <ButtonsWrapper>
                    <Button type="submit">{t("form:create")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
