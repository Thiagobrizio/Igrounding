import type { Project } from "@repo/db/controllers/project";

import OpenDSSDriver from "@repo/opendss-interface";

import Circuit from "./elements/Circuit";
import ConductorType from "./elements/ConductorType";
import Source from "./elements/Source";
import TowerGeometry from "./elements/TowerGeometry";
import TransmissionLine from "./elements/TransmissionLine";
import { getConnectedPhases } from "./helpers/getConnectedPhases";

export default function createCircuit(project: Project) {
    const driver = new OpenDSSDriver();
    const circuit = new Circuit(driver);

    project.sources.forEach((source) => {
        const connectedPhases = getConnectedPhases(
            source,
            project.transmissionLines
        );
        const newSource = new Source(source, connectedPhases);
        circuit.addSource(newSource);
    });

    project.towerGeometries.forEach((towerGeometry) => {
        const newTowerGeometry = new TowerGeometry(towerGeometry);
        circuit.addTowerGeometry(newTowerGeometry);
    });

    project.conductorTypes.forEach((conductorType) => {
        const newConductorType = new ConductorType(conductorType);
        circuit.addConductorType(newConductorType);
    });

    project.transmissionLines.forEach((transmissionLine) => {
        const newTransmissionLine = new TransmissionLine(transmissionLine);
        circuit.addTransmissionLine(newTransmissionLine);
    });

    return circuit;
}
