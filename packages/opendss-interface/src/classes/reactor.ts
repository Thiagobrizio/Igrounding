import {
    type OpenDSSReactorParameters,
    type ReactorParameters,
    reactorSchema,
} from "@repo/validators/opendss/reactor";

import {
    arrayTransform,
    booleanTransform,
    busTransform,
    numberTransform,
} from "../helpers/transformers";
import BaseElement from "./BaseElement";

export default class Reactor extends BaseElement<
    ReactorParameters,
    OpenDSSReactorParameters
> {
    parameterNames: (keyof OpenDSSReactorParameters)[] = [
        "bus1",
        "bus2",
        "phases",
        "kvar",
        "kv",
        "conn",
        "rMatrix",
        "xMatrix",
        "parallel",
        "r",
        "x",
        "rp",
        "z1",
        "z2",
        "z0",
        "z",
        "rCurve",
        "lCurve",
        "lmH",
        "normAmps",
        "emergAmps",
        "faultRate",
        "pctperm",
        "repair",
        "baseFreq",
        "enabled",
    ];
    parameters;
    type = "Reactor";

    constructor(input: ReactorParameters) {
        super();
        this.parameters = reactorSchema.parse(input);
    }

    transform() {
        return {
            name: `Reactor.${this.parameters.name}`,
            bus1: busTransform(this.parameters.bus1),
            bus2: busTransform(this.parameters.bus2),
            phases: numberTransform(this.parameters.phases),
            kvar: numberTransform(this.parameters.kvar),
            kv: numberTransform(this.parameters.kv),
            conn: this.parameters.conn,
            rMatrix: arrayTransform(this.parameters.rMatrix),
            xMatrix: arrayTransform(this.parameters.xMatrix),
            parallel: booleanTransform(this.parameters.parallel),
            r: numberTransform(this.parameters.r),
            x: numberTransform(this.parameters.x),
            rp: numberTransform(this.parameters.rp),
            z1: arrayTransform(this.parameters.z1),
            z2: arrayTransform(this.parameters.z2),
            z0: arrayTransform(this.parameters.z0),
            z: arrayTransform(this.parameters.z),
            rCurve: this.parameters.rCurve,
            lCurve: this.parameters.lCurve,
            lmH: numberTransform(this.parameters.lmH),
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
