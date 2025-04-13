import type { Project } from "@repo/db/controllers/project";

import OpenDSSInterface from "@repo/opendss-interface";
import Line from "@repo/opendss-interface/classes/line";
import LineGeometry from "@repo/opendss-interface/classes/lineGeometry";
import { type LineID } from "@repo/validators/Ids";

import TransmissionTower from "./TransmissionTower";

export default class TransmissionLine {
    id: LineID;
    lineGeometries: LineGeometry[] = [];
    lines: Line[] = [];
    // reactors: Reactor[] = [];
    towers: TransmissionTower[] = [];

    constructor(input: Project["transmissionLines"][number]) {
        this.id = input.id;
        const wireNames: string[] = input.conductors.map(
            (conductor) => conductor.type.name
        );

        // Line Geometries
        const allGeometries = input.towers.map((tower) => tower.geometry);
        const uniqueGeometries = [
            ...new Map(allGeometries.map((item) => [item.name, item])).values(),
        ];

        uniqueGeometries.forEach((geometry) => {
            const lineGeometry = new LineGeometry({
                name: `${input.name}_${geometry.name}`,
                nconds: input.conductors.length,
                nphases: input.conductors.length,
                spacing: geometry.name,
                reduce: false,
                wires: wireNames,
            });
            this.lineGeometries.push(lineGeometry);
        });

        const numConductors = input.conductors.length;
        const numNeutrals = input.conductors.filter(
            (conductor) => conductor.isNeutral
        ).length;
        const numPhases = numConductors - numNeutrals;
        const initialPhases = input.conductors.map(
            (transmissionLine) => transmissionLine.fromPhase
        );
        const middlePhases = [...Array(numPhases).keys()].map((i) => i + 1); // array from 1 to numPhases
        const middleNeutrals = [...Array(numNeutrals).keys()].map(() => 20);
        const finalPhases = input.conductors.map(
            (transmissionLine) => transmissionLine.toPhase
        );

        input.towers.forEach((tower, index) => {
            const name = `${input.name}_${tower.name}`;

            const towerNumber = index + 1;
            if (towerNumber === 1) {
                const lineObject = new Line({
                    name: `${name}_line`,
                    bus1: {
                        name: `B_${input.fromSource.name}`,
                        phases: initialPhases,
                    },
                    bus2: {
                        name: `B_${name}`,
                        phases: [...middlePhases, ...middleNeutrals],
                    },
                    phases: numConductors,
                    length: tower.distance,
                    units: "m",
                    geometry: `${input.name}_${tower.geometry.name}`,
                });
                const transmissionTower = new TransmissionTower({
                    name: name,
                    busName: `B_${name}`,
                    resistance: tower.resistance,
                    neutralPhases: [20],
                    id: tower.id,
                });

                this.lines.push(lineObject);
                this.towers.push(transmissionTower);
            } else {
                const prevTower = input.towers[index - 1];
                if (!prevTower) {
                    throw new Error("Can't find previous tower");
                }
                const prevName = `B_${input.name}_${prevTower.name}`;
                const lineObject = new Line({
                    name: `${name}_line`,
                    bus1: {
                        name: prevName,
                        phases: [...middlePhases, ...middleNeutrals],
                    },
                    bus2: {
                        name: `B_${name}`,
                        phases: [...middlePhases, ...middleNeutrals],
                    },
                    length: tower.distance,
                    phases: numConductors,
                    units: "m",
                    geometry: `${input.name}_${tower.geometry.name}`,
                });
                const transmissionTower = new TransmissionTower({
                    name: name,
                    busName: `B_${name}`,
                    resistance: tower.resistance,
                    neutralPhases: [20],
                    id: tower.id,
                });

                this.lines.push(lineObject);
                this.towers.push(transmissionTower);

                if (towerNumber === input.towers.length) {
                    const lastLineObject = new Line({
                        name: `${name}_extra_span`,
                        bus1: {
                            name: `B_${name}`,
                            phases: [...middlePhases, ...middleNeutrals],
                        },
                        bus2: {
                            name: `B_${input.toSource.name}`,
                            phases: finalPhases,
                        },
                        length: tower.distance, // FIXME: This is wrong, assuming the last line to substation is same as previous
                        phases: numConductors,
                        units: "m",
                        geometry: `${input.name}_${tower.geometry.name}`,
                    });
                    this.lines.push(lastLineObject);
                }
            }
        });
    }

    create() {
        const script = [
            ...this.lineGeometries.flatMap((lg) => lg.create()),
            ...this.lines.flatMap((l) => l.create()),
            ...this.towers.flatMap((t) => t.create()),
        ];

        return script;
    }

    getCurrent(driver: OpenDSSInterface) {
        const towers = this.towers.map((tower) => {
            const name = tower.reactor.parameters.name;
            const currents = driver
                .getCurrentsRect(`Reactor.${name}`)
                .filter((phase) => phase.phase !== 0)
                .reduce(
                    (acc, curr) => {
                        acc.real += curr.real;
                        acc.imag += curr.imag;
                        return acc;
                    },
                    { real: 0, imag: 0 }
                );
            const current = Math.sqrt(
                Math.pow(currents.real, 2) + Math.pow(currents.imag, 2)
            );
            const angleRadians = Math.atan2(currents.imag, currents.real);
            const angle = (angleRadians * 180) / Math.PI;
            return {
                id: tower.id,
                name: tower.name,
                current,
                angle,
            };
        });

        const lines = this.lines.map((line, index) => {
            const name = line.parameters.name;
            const currents = driver.getCurrentsPolar(`Line.${name}`);
            const inCurrents = currents.slice(0, currents.length / 2);
            const outCurrents = currents.slice(currents.length / 2);
            return {
                id: line.id,
                fromTower: this.towers[index - 1]?.id,
                toTower: this.towers[index]?.id,
                inCurrents,
                outCurrents,
            };
        });

        return {
            id: this.id,
            lines,
            towers,
        };
    }
}
