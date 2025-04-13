import { Button } from "@repo/ui/button";
import toast from "@repo/ui/toast";
import { CircleX, FolderOpen, PlusCircle, Save, SaveAll } from "lucide-react";

import trpc from "~/utils/trpc";

export default function HomePageMenu() {
    const utils = trpc.useUtils();
    const { data } = trpc.project.isOpen.useQuery();
    const openMutation = trpc.project.open.useMutation({
        async onSuccess() {
            toast.success("Opened");

            await utils.project.isOpen.invalidate();
            await utils.project.filePath.invalidate();
        },
    });
    const createMutation = trpc.project.create.useMutation({
        async onSuccess() {
            toast.success("Created");
            await utils.project.isOpen.invalidate();
            await utils.project.filePath.invalidate();
        },
    });
    const saveMutation = trpc.project.save.useMutation({
        async onSuccess() {
            toast.success("Saved");
            await utils.project.isOpen.invalidate();
            await utils.project.filePath.invalidate();
        },
    });
    const saveAsMutation = trpc.project.saveAs.useMutation({
        async onSuccess() {
            toast.success("Created a new file");
            await utils.project.isOpen.invalidate();
            await utils.project.filePath.invalidate();
        },
    });
    const closeMutation = trpc.project.close.useMutation({
        async onSuccess() {
            toast.success("Closed");
            await utils.project.isOpen.invalidate();
            await utils.project.filePath.invalidate();
        },
    });
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <Button
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!!data}
                onClick={() => createMutation.mutate()}
                variant="outline"
            >
                <PlusCircle className="h-8 w-8 mb-2" />
                <span className="text-xs">New</span>
            </Button>
            <Button
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!!data}
                onClick={() => openMutation.mutateAsync()}
                variant="outline"
            >
                <FolderOpen className="h-8 w-8 mb-2" />
                <span className="text-xs">Open</span>
            </Button>
            <Button
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!data}
                onClick={() => saveMutation.mutateAsync()}
                variant="outline"
            >
                <Save className="h-8 w-8 mb-2" />
                <span className="text-xs">Save</span>
            </Button>
            <Button
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!data}
                onClick={() => saveAsMutation.mutateAsync()}
                variant="outline"
            >
                <SaveAll className="h-8 w-8 mb-2" />
                <span className="text-xs">Save As...</span>
            </Button>
            <Button
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!data}
                onClick={() => closeMutation.mutateAsync()}
                variant="outline"
            >
                <CircleX className="h-8 w-8 mb-2" />
                <span className="text-xs">Close</span>
            </Button>
        </div>
    );
}
