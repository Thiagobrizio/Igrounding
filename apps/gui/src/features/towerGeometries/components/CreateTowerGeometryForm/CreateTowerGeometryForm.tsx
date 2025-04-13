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
    defaultTowerGeometry,
    type TowerGeometryFormInput,
    towerGeometryFormSchema,
} from "@repo/validators/forms";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import trpc from "~/utils/trpc";

interface CreateTowerGeometryFormProps {
    onFinish?: () => void;
}

export default function CreateTowerGeometryForm({
    onFinish,
}: CreateTowerGeometryFormProps) {
    const { t } = useTranslation("createTowerGeometryForm");

    const form = useForm({
        schema: towerGeometryFormSchema,
        defaultValues: defaultTowerGeometry,
    });

    const navigate = useNavigate();
    const createMutation = trpc.towerGeometry.create.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been added.`);
            await navigate({ to: "/libraries/tower-geometries" });
            if (onFinish) onFinish();
        },
        onError(error) {
            toast.error("Can't create Tower Geometry");
            console.log(error);
        },
    });

    function handleValid(values: TowerGeometryFormInput) {
        createMutation.mutate(values);
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
                    <Button type="reset" variant="destructive">
                        {t("form:reset")}
                    </Button>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
