import type { TowerID } from "@repo/validators/Ids";

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
    type TransmissionTowerFormInput,
    transmissionTowerFormSchema,
} from "@repo/validators/forms/TransmissionTower.schema";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import TowerGeometrySelect from "~/features/towerGeometries/components/TowerGeometrySelect";
import trpc from "~/utils/trpc";

interface UpdateTowerFormProps {
    towerId: TowerID;
    onFinish?: () => void;
}

export default function UpdateTowerForm({
    towerId,
    onFinish,
}: UpdateTowerFormProps) {
    const { t } = useTranslation("updateTowerForm");
    const utils = trpc.useUtils();

    const [data, query] = trpc.tower.getById.useSuspenseQuery({
        id: towerId,
    });

    const form = useForm<TransmissionTowerFormInput>({
        schema: transmissionTowerFormSchema,
        values: data,
    });

    const updateMutation = trpc.tower.update.useMutation({
        async onSuccess(values) {
            await utils.tower.getAllByLineId.invalidate({
                lineId: values.lineId,
            });
            toast.success("Transmission tower updated");
            if (onFinish) onFinish();
        },
        onError(error) {
            toast.error("Transmission tower not updated");
            console.log(error);
        },
    });

    function handleValid(values: TransmissionTowerFormInput) {
        updateMutation.mutate({ ...values, id: towerId });
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
                    <Button type="submit">{t("form:update")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
