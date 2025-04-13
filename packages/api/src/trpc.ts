import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

import type { ProjectContext } from "./global";
import type { Context } from "./index";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
    errorFormatter(opts) {
        const { shape, error } = opts;

        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

export const projectProcedure = t.procedure.use(async function isAuthed({
    ctx,
    next,
}) {
    if (!ctx.project.db) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "No Current Project",
        });
    }

    if (!ctx.project.fileName) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Filename not set",
        });
    }

    if (!ctx.project.db.$client.open) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Connection not open",
        });
    }

    return next({
        ctx: {
            project: ctx.project as ProjectContext,
        },
    });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router.
 */
export const {
    router,
    procedure: publicProcedure,
    mergeRouters,
    createCallerFactory,
} = t;
