import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";

import CreateSourceForm from "~/features/sources/components/CreateSourceForm";

export const Route = createFileRoute("/project/_layout/sources/new")({
    component: NewSourcePage,
});

export default function NewSourcePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("add.title")}</CardTitle>
                <CardDescription>{t("add.description")}</CardDescription>
            </CardHeader>
            <CardContent>
                <CreateSourceForm />
            </CardContent>
        </Card>
    );
}
