import { getProject } from "@repo/db/controllers/project";
import { eq } from "@repo/db/drizzle";
import { transmissionLines } from "@repo/db/project/transmissionLines";
import { transmissionTowers } from "@repo/db/project/transmissionTowers";
import createCircuit from "@repo/solution/createCircuit";
import Fault from "@repo/solution/elements/Fault";
import { solveSolutionSchema } from "@repo/validators/schemas/Solution.schema";
import { getSourceByIdSchema } from "@repo/validators/schemas/Source.schema";
import { getTransmissionLineByIdSchema } from "@repo/validators/schemas/TransmissionLine.schema";
import { TRPCError } from "@trpc/server";

import { projectProcedure, router } from "../trpc";

export default router({
    hasSolution: projectProcedure.query(async ({ ctx }) => {
        const solution = ctx.project.solution;
        if (solution) {
            return true;
        } else {
            return false;
        }
    }),
    getSolution: projectProcedure.query(async ({ ctx }) => {
        return ctx.project.solution;
    }),
    solve: projectProcedure
        .input(solveSolutionSchema)
        .mutation(async ({ ctx, input }) => {
            // TODO
            const project = await getProject(ctx.project.db, ctx.db);
            let busName = "";
            if (input.sourceId) {
                const source = project.sources.find(
                    (s) => s.id === input.sourceId
                );
                if (!source) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Can't find Source",
                    });
                }
                busName = `B_${source.name}`;
            } else if (input.towerId) {
                const [tower] = await ctx.project.db
                    .select()
                    .from(transmissionTowers)
                    .innerJoin(
                        transmissionLines,
                        eq(transmissionTowers.lineId, transmissionLines.id)
                    )
                    .where(eq(transmissionTowers.id, input.towerId));
                if (!tower) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Can't find Tower",
                    });
                }
                busName = `B_${tower.transmission_lines.name}_${tower.transmission_towers.name}`;
            } else {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "No source or tower selected",
                });
            }
            const circuit = createCircuit(project);
            const fault = new Fault(busName);
            circuit.addFault(fault);
            circuit.solve();
            const currents = circuit.getAllCurrents();
            const script = circuit.getScript();
            ctx.project.solution = {
                ...currents,
                script,
            };
            return true;
        }),

    getSourceCurrents: projectProcedure
        .input(getSourceByIdSchema)
        .query(async ({ ctx, input }) => {
            const source = ctx.project.solution?.sources.find(
                (s) => s.id === input.id
            );
            return source;
        }),
    getScript: projectProcedure.query(async ({ ctx }) => {
        return ctx.project.solution?.script;
    }),
    getWorstCase: projectProcedure.query(async ({ ctx }) => {
        const project = await getProject(ctx.project.db, ctx.db);
        const circuit = createCircuit(project);
        const fault = new Fault(`TEST`);
        circuit.addFault(fault);
        const sourceCurrents = project.sources.map((source) => {
            fault.setBus(`B_${source.name}`);
            circuit.solve();
            const current = circuit
                .getCurrent(`Reactor.${source.name}_RT`)
                .filter((c) => c.phase !== 0)[0];
            if (!current) {
                throw Error("No current found");
            }
            return {
                id: source.id,
                name: source.name,
                current,
            };
        });
        const towerCurrents = project.transmissionLines.flatMap((line) => {
            return line.towers.map((tower) => {
                fault.setBus(`B_${line.name}_${tower.name}`);
                circuit.solve();
                const current = circuit
                    .getCurrent(`Reactor.${line.name}_${tower.name}_RT`)
                    .filter((c) => c.phase !== 0)[0];
                if (!current) {
                    throw Error("No current found");
                }
                return { id: tower.id, name: tower.name, current };
            });
        });
        return {
            sourceCurrents,
            towerCurrents,
        };
    }),
    getLineCurrents: projectProcedure
        .input(getTransmissionLineByIdSchema)
        .query(async ({ ctx, input }) => {
            const tline = ctx.project.solution?.transmissionLines.find(
                (tl) => tl.id === input.id
            );
            if (!tline) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            return tline;
        }),
});
