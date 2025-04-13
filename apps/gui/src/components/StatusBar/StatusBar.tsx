
import trpc from "~/utils/trpc";

export default function StatusBar() {
    const { data } = trpc.meta.version.useQuery();
    const { data: currentProject } = trpc.project.filePath.useQuery();
    return (
        <div className="flex justify-between items-center gap-4 px-4 py-2 border-t bg-background">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                © {new Date().getFullYear()}

            </p>
            {currentProject ? (
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-green-500" />
                    {currentProject}
                </div>
            ) : null}
            <p>v{data}</p>
        </div>
    );
}
