import type { Project } from "@repo/db/controllers/project";

import OpenDSSInterface from "@repo/opendss-interface";
import Reactor from "@repo/opendss-interface/classes/reactor";
import VSource from "@repo/opendss-interface/classes/vSource";
import { SourceID } from "@repo/validators/Ids";

export default class Source {
    id: SourceID;
    reactor: Reactor;
    vSource: VSource;

    constructor(input: Project["sources"][number], phases: number[]) {
        this.id = input.id;
        const sourcePhases = [...Array(input.phases).keys()].map((i) => i + 1);
        this.vSource = new VSource({
            name: input.name,
            bus1: {
                name: `B_${input.name}`,
                phases: sourcePhases,
            },
            phases: input.phases,
            basekv: input.voltage,
            x1r1: input.x1r1,
            isc1: input.isc1,
            isc3: input.isc3,
            x0r0: input.x0r0,
        });

        this.reactor = new Reactor({
            name: `${input.name}_RT`,
            bus1: {
                name: `B_${input.name}`,
                phases,
            },
            bus2: {
                name: `B_${input.name}`,
                phases: new Array(phases.length).fill(0),
            },
            r: input.resistance,
            x: 0,
            phases: phases.length,
        });
    }

    create() {
        return [...this.vSource.create(), ...this.reactor.create()];
    }

    getCurrent(driver: OpenDSSInterface) {
        const reactorCurrent = driver.getCurrentsPolar(
            `Reactor.${this.reactor.parameters.name}`
        );
        const vSourceCurrent = driver.getCurrentsPolar(
            `VSource.${this.vSource.parameters.name}`
        );
        return {
            id: this.id,
            reactor: reactorCurrent,
            vSource: vSourceCurrent,
        };
    }
}
