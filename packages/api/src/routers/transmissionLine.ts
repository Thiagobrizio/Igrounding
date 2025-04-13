import { aliasedTable, eq, getTableColumns } from "@repo/db/drizzle";
import { sources } from "@repo/db/project/sources";
import { transmissionLines } from "@repo/db/project/transmissionLines";
import {
    createTransmissionLineSchema,
    deleteTransmissionLineSchema,
    getAllTransmissionLinesSchema,
    getTransmissionLineByIdSchema,
    updateTransmissionLineSchema,
} from "@repo/validators/schemas/TransmissionLine.schema";
import { TRPCError } from "@trpc/server";

import { projectProcedure, router } from "../trpc";

const fromSource = aliasedTable(sources, "fromSource");
const toSource = aliasedTable(sources, "toSource");
const columns = getTableColumns(transmissionLines);

export default router({
    getAll: projectProcedure
        .input(getAllTransmissionLinesSchema)
        .query(async ({ ctx }) => {
            const lines = await ctx.project.db
                .select({
                    ...columns,
                    fromSource: fromSource,
                    toSource: toSource,
                })
                .from(transmissionLines)
                .innerJoin(
                    fromSource,
                    eq(transmissionLines.fromSourceId, fromSource.id)
                )
                .innerJoin(
                    toSource,
                    eq(transmissionLines.toSourceId, toSource.id)
                );
            return lines;
        }),
    getById: projectProcedure
        .input(getTransmissionLineByIdSchema)
        .query(async ({ input, ctx }) => {
            const [tline] = await ctx.project.db
                .select({
                    ...columns,
                    fromSource: fromSource,
                    toSource: toSource,
                })
                .from(transmissionLines)
                .innerJoin(
                    fromSource,
                    eq(transmissionLines.fromSourceId, fromSource.id)
                )
                .leftJoin(
                    toSource,
                    eq(transmissionLines.toSourceId, toSource.id)
                )
                .where(eq(transmissionLines.id, input.id));

            if (!tline) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            return tline;
        }),
    create: projectProcedure
        .input(createTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const [newTransmissionLine] = await ctx.project.db
                .insert(transmissionLines)
                .values(input)
                .returning();
            if (!newTransmissionLine) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't create Transmission Line",
                });
            }
            return newTransmissionLine;
        }),
    update: projectProcedure
        .input(updateTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const [updatedTransmissionLine] = await ctx.project.db
                .update(transmissionLines)
                .set(input)
                .where(eq(transmissionLines.id, input.id))
                .returning();

            if (!updatedTransmissionLine) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No Transmission Line",
                });
            }
            return updatedTransmissionLine;
        }),
    delete: projectProcedure
        .input(deleteTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const [deletedTransmissionLine] = await ctx.project.db
                .delete(transmissionLines)
                .where(eq(transmissionLines.id, input.id))
                .returning();

            if (!deletedTransmissionLine) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No Transmission Line",
                });
            }
            return deletedTransmissionLine;
        }),
});
