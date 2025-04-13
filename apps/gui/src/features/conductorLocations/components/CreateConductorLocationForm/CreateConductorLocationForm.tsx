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
    type ConductorLocationFormInput,
    conductorLocationFormSchema,
    defaultConductorLocation,
} from "@repo/validators/forms";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import trpc from "~/utils/trpc";

interface CreateConductorLocationFormProps {
    geometryId: GeometryID;
    onFinish?: () => void;
}

export default function CreateConductorLocationForm({
    geometryId,
    onFinish,
}: CreateConductorLocationFormProps) {
    const utils = trpc.useUtils();
    const { t } = useTranslation("createConductorLocationForm");
    const form = useForm<ConductorLocationFormInput>({
        schema: conductorLocationFormSchema,
        defaultValues: defaultConductorLocation,
    });
    const createMutation = trpc.conductorLocations.create.useMutation({
        onSuccess: async () => {
            toast.success("Conductor location created");
            await utils.conductorLocations.getAllByGeometryId.invalidate({
                geometryId,
            });
            if (onFinish) onFinish();
        },
        onError: (error) => {
            toast.error("Failed to create conductor location");
            console.error(error);
        },
    });

    function handleValid(data: ConductorLocationFormInput) {
        createMutation.mutate({ ...data, geometryId });
    }

    return (
        <Form {...form}>
            <StyledForm
                onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
            >
                <FormField
                    control={form.control}
                    name="x"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("x.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("x.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="y"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("y.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("y.description")}
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
