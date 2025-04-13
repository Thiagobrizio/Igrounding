import type { Source } from "@repo/db/project/sources";
import type { TransmissionConductor } from "@repo/db/project/transmissionConductors";
import type { TransmissionLine } from "@repo/db/project/transmissionLines";

export function getConnectedPhases(
    source: Source,
    transmissionLines: (TransmissionLine & {
        conductors: TransmissionConductor[];
    })[]
) {
    const connectedTransmissionLines = transmissionLines.filter(
        (transmissionLine) =>
            transmissionLine.fromSourceId === source.id ||
            transmissionLine.toSourceId === source.id
    );
    const connectedPhases = connectedTransmissionLines.flatMap(
        (transmissionLine) =>
            transmissionLine.conductors
                .filter((conductor) => conductor.isNeutral)
                .map((conductor) =>
                    transmissionLine.fromSourceId === source.id
                        ? conductor.fromPhase
                        : conductor.toPhase
                )
    );

    const uniqueConductors = [...new Set(connectedPhases)];
    const sortedConductors = uniqueConductors.sort((a, b) => a - b);
    return sortedConductors;
}
