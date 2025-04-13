import type { ProjectDatabase } from "@repo/db";
import type { Solution } from "@repo/solution";

export interface ProjectContext {
    db: ProjectDatabase;
    fileName: string;
    solution: Solution | null;
}

export interface NoProjectContext {
    db: null;
    fileName: null;
    solution: null;
}

export const store: ProjectContext | NoProjectContext = {
    db: null,
    solution: null,
    fileName: null,
};
