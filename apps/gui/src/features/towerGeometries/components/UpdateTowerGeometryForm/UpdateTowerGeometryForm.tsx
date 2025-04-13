import type { GeometryID } from "@repo/validators/Ids";

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
    type TowerGeometryFormInput,
    towerGeometryFormSchema,
} from "@repo/validators/forms/TowerGeometry.schema";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import trpc from "~/utils/trpc";

interface UpdateTowerGeometryFormProps {
    geometryId: GeometryID;
    onFinish?: () => void;
}

export default function UpdateTowerGeometryForm({
    geometryId,
    onFinish,
}: UpdateTowerGeometryFormProps) {
    const { t } = useTranslation("updateTowerGeometryForm");
    const navigate = useNavigate();

    const [data, query] = trpc.towerGeometry.getById.useSuspenseQuery({
        id: geometryId,
    });
    const form = useForm({
        schema: towerGeometryFormSchema,
        values: data,
    });

    const updateMutation = trpc.towerGeometry.update.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been updated.`);
            await navigate({ to: "/libraries/tower-geometries" });
            if (onFinish) onFinish();
        },
        onError(error) {
            toast.error("Can't update Tower Geometry");
            console.log(error);
        },
    });

    function handleValid(values: TowerGeometryFormInput) {
        updateMutation.mutate({
            ...values,
            id: geometryId,
        });
    }

    if (query.isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (query.isError) {
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
                <ButtonsWrapper>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
