import Reactor from "@repo/opendss-interface/classes/reactor";
import { GeometryID } from "@repo/validators/Ids";

interface TransmissionTowerInput {
    id: string;
    name: string;
    resistance: number;
    neutralPhases: number[];
    busName: string;
}

export default class TransmissionTower {
    id: GeometryID;
    name: string;
    reactor: Reactor;
    constructor(input: TransmissionTowerInput) {
        this.id = input.id;
        this.name = input.name;
        const bus2Phases = new Array(input.neutralPhases.length).fill(0);
        this.reactor = new Reactor({
            name: `${input.name}_RT`,
            bus1: {
                name: input.busName,
                phases: input.neutralPhases,
            },
            bus2: {
                name: input.busName,
                phases: bus2Phases,
            },
            r: input.resistance,
            x: 0,
            phases: input.neutralPhases.length,
        });
    }

    create() {
        return this.reactor.create();
    }
}
