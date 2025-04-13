import type { ConductorLocation } from "@repo/db/schemas/conductorLocations";
import type { ConductorType } from "@repo/db/schemas/conductorTypes";

import * as Math from "mathjs";

import { e0, u0 } from "./constants";

function calcDistance(
    conductor1: ConductorLocation,
    conductor2: ConductorLocation
) {
    return Math.sqrt(
        (conductor2.x - conductor1.x) ** 2 + (conductor2.y - conductor1.y) ** 2
    );
}

function calcImageDistance(
    conductor1: ConductorLocation,
    conductor2: ConductorLocation
) {
    return Math.sqrt(
        (conductor2.x - conductor1.x) ** 2 +
            (-1 * conductor2.y - conductor1.y) ** 2
    );
}

export default function buildTransmissionLineMatrix(
    locations: ConductorLocation[],
    conductors: ConductorType[]
) {
    console.log("Calculating Transmission line parameters...");

    const freq = 60; // Hz
    const resistivity = 100; // # ohm*m
    const resistanceGround = (u0 * 2 * Math.pi * freq) / 8; // ohm/m

    const reactanceGround =
        u0 * freq * Math.log(658.5 * (resistivity / freq) ** (1 / 2)); // ohm/m

    const numConductors = conductors.length;
    const rMatrix = Math.zeros(numConductors, numConductors) as Math.Matrix;
    const xMatrix = Math.zeros(numConductors, numConductors) as Math.Matrix;
    const pMatrix = Math.zeros(numConductors, numConductors) as Math.Matrix;

    for (const [i, firstConductor] of conductors.entries()) {
        for (const [j] of conductors.entries()) {
            const location1 = locations[i];
            const location2 = locations[j];

            if (!location1 || !location2) {
                throw Error("No location found in payload");
            }

            const imageDistance = calcImageDistance(location1, location2); // m

            if (i === j) {
                const radius = firstConductor.outerDiameter / 2; // m
                const selfReactance =
                    u0 * freq * Math.log(1 / firstConductor.gmr); // ohm/m
                const resistance =
                    firstConductor.acResistance75 + resistanceGround; // ohm/m
                const reactance = selfReactance + reactanceGround; // ohm/m
                const elastance = Math.multiply(
                    (1 / (2 * Math.pi * e0)) * 10 ** -9,
                    Math.log(Math.divide(imageDistance, radius) as number)
                ); // m/nF

                xMatrix.subset(Math.index(i, i), reactance);
                rMatrix.subset(Math.index(i, i), resistance);
                pMatrix.subset(Math.index(i, i), elastance);
            } else {
                const conductorDistance = calcDistance(location1, location2); // m
                const mutualReactance = Math.multiply(
                    u0 * freq,
                    Math.log(Math.divide(1, conductorDistance) as number)
                ); // ohm/m
                const resistance = resistanceGround; // ohm/m
                const reactance = mutualReactance + reactanceGround; // ohm/m
                const elastance =
                    (1 / (2 * Math.pi * e0)) *
                    Math.log(
                        Math.divide(imageDistance, conductorDistance) as number
                    ) *
                    10 ** -9; // m/nF

                xMatrix.subset(Math.index(i, j), reactance);
                rMatrix.subset(Math.index(i, j), resistance);
                pMatrix.subset(Math.index(i, j), elastance);
            }
        }
    }
    const cMatrix = Math.inv(pMatrix); // nF/m

    return {
        rMatrix: rMatrix.toArray() as number[][],
        xMatrix: xMatrix.toArray() as number[][],
        cMatrix: cMatrix.toArray() as number[][],
    };
}
