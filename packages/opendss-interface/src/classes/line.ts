import {
    LineParameters,
    lineSchema,
    OpenDSSLineParameters,
} from "@repo/validators/opendss/line";

import {
    arrayTransform,
    booleanTransform,
    busTransform,
    numberTransform,
} from "../helpers/transformers";
import BaseElement from "./BaseElement";

export default class Line extends BaseElement<
    LineParameters,
    OpenDSSLineParameters
> {
    parameterNames: (keyof OpenDSSLineParameters)[] = [
        "bus1",
        "bus2",
        "lineCode",
        "length",
        "phases",
        "r1",
        "x1",
        "r0",
        "x0",
        "c1",
        "c0",
        "rMatrix",
        "xMatrix",
        "cMatrix",
        "switch",
        "rg",
        "xg",
        "rho",
        "geometry",
        "units",
        "spacing",
        "wires",
        "earthModel",
        "cnCables",
        "tsCables",
        "b1",
        "b0",
        "seasons",
        "ratings",
        "lineType",
        "normAmps",
        "emergAmps",
        "faultRate",
        "pctperm",
        "repair",
        "baseFreq",
        "enabled",
    ];
    parameters;
    type = "Line";
    constructor(input: LineParameters) {
        super();
        this.parameters = lineSchema.parse(input);
    }
    transform() {
        return {
            name: `Line.${this.parameters.name}`,
            bus1: busTransform(this.parameters.bus1),
            bus2: busTransform(this.parameters.bus2),
            lineCode: this.parameters.lineCode,
            length: numberTransform(this.parameters.length),
            phases: numberTransform(this.parameters.phases),
            r1: numberTransform(this.parameters.r1),
            x1: numberTransform(this.parameters.x1),
            r0: numberTransform(this.parameters.r0),
            x0: numberTransform(this.parameters.x0),
            c1: numberTransform(this.parameters.c1),
            c0: numberTransform(this.parameters.c0),
            rMatrix: arrayTransform(this.parameters.rMatrix),
            xMatrix: arrayTransform(this.parameters.xMatrix),
            cMatrix: arrayTransform(this.parameters.cMatrix),
            switch: booleanTransform(this.parameters.switch),
            rg: numberTransform(this.parameters.rg),
            xg: numberTransform(this.parameters.xg),
            rho: numberTransform(this.parameters.rho),
            geometry: this.parameters.geometry,
            units: this.parameters.units,
            spacing: this.parameters.spacing,
            wires: arrayTransform(this.parameters.wires),
            earthModel: this.parameters.earthModel,
            cnCables: arrayTransform(this.parameters.cnCables),
            tsCables: arrayTransform(this.parameters.tsCables),
            b1: numberTransform(this.parameters.b1),
            b0: numberTransform(this.parameters.b0),
            seasons: numberTransform(this.parameters.seasons),
            ratings: arrayTransform(this.parameters.ratings),
            lineType: this.parameters.lineType,
            normAmps: numberTransform(this.parameters.normAmps),
            emergAmps: numberTransform(this.parameters.emergAmps),
            faultRate: numberTransform(this.parameters.faultRate),
            pctperm: numberTransform(this.parameters.pctperm),
            repair: numberTransform(this.parameters.repair),
            baseFreq: numberTransform(this.parameters.baseFreq),
            enabled: booleanTransform(this.parameters.enabled),
        };
    }
}
