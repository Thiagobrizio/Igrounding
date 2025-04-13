import type { Project } from "@repo/db/controllers/project";

import createCircuit from "./createCircuit";

export default function solveProject(project: Project) {
    const circuit = createCircuit(project);
    circuit.solve();
    const currents = circuit.getAllCurrents();
    const script = circuit.getScript();
    return {
        ...currents,
        script,
    };
}

export type Solution = ReturnType<typeof solveProject>;
