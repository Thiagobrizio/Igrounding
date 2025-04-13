import OpenDSSInterface from "@repo/opendss-interface";

import type ConductorType from "./ConductorType";
import type Fault from "./Fault";
import type Source from "./Source";
import type TowerGeometry from "./TowerGeometry";
import type TransmissionLine from "./TransmissionLine";

export default class Circuit {
    conductorTypes: ConductorType[] = [];
    driver: OpenDSSInterface;
    fault?: Fault;
    sources: Source[] = [];
    towerGeometries: TowerGeometry[] = [];
    transmissionLines: TransmissionLine[] = [];

    constructor(openDssDriver: OpenDSSInterface) {
        this.driver = openDssDriver;
    }

    addConductorType(conductorType: ConductorType) {
        this.conductorTypes.push(conductorType);
    }

    addFault(fault: Fault) {
        this.fault = fault;
    }

    addSource(source: Source) {
        this.sources.push(source);
    }

    addTowerGeometry(towerGeometry: TowerGeometry) {
        this.towerGeometries.push(towerGeometry);
    }

    addTransmissionLine(transmissionLine: TransmissionLine) {
        this.transmissionLines.push(transmissionLine);
    }

    getAllCurrents() {
        const transmissionLines = this.transmissionLines.map((line) =>
            line.getCurrent(this.driver)
        );

        const sources = this.sources.map((source) =>
            source.getCurrent(this.driver)
        );
        return {
            sources,
            transmissionLines,
        };
    }

    getCurrent(elementName: string) {
        return this.driver.getCurrentsPolar(elementName);
    }

    getScript() {
        const script = ["clearAll", "New Circuit.TEST"];
        this.sources.forEach((source) => {
            script.push(...source.create());
        });

        this.towerGeometries.forEach((towerGeometry) => {
            script.push(...towerGeometry.create());
        });

        this.conductorTypes.forEach((conductorTypes) => {
            script.push(...conductorTypes.create());
        });

        this.transmissionLines.forEach((transmissionLine) => {
            script.push(...transmissionLine.create());
        });

        if (this.fault) {
            script.push(...this.fault.create());
        }
        script.push("solve");
        script.push("show currents elements");
        return script;
    }

    solve() {
        this.driver.dss.ClearAll();
        this.driver.sendArray(["New Circuit.TEST"]);
        this.sources.forEach((source) => {
            this.driver.sendArray(source.create());
        });

        this.towerGeometries.forEach((towerGeometry) => {
            this.driver.sendArray(towerGeometry.create());
        });

        this.conductorTypes.forEach((conductorTypes) => {
            this.driver.sendArray(conductorTypes.create());
        });

        this.transmissionLines.forEach((transmissionLine) => {
            this.driver.sendArray(transmissionLine.create());
        });

        if (this.fault) {
            this.driver.sendArray(this.fault.create());
        }

        this.driver.solve();
    }
}
