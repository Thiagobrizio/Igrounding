import {
    type FaultParameters,
    faultSchema,
    type OpenDSSFaultParameters,
} from "@repo/validators/opendss/fault";

import {
    arrayTransform,
    booleanTransform,
    busTransform,
    numberTransform,
} from "../helpers/transformers";
import BaseElement from "./BaseElement";

export default class Fault extends BaseElement<
    FaultParameters,
    OpenDSSFaultParameters
> {
    parameterNames: (keyof OpenDSSFaultParameters)[] = [
        "bus1",
        "bus2",
        "phases",
        "r",
        "%stddev",
        "gMatrix",
        "onTime",
        "temporary",
        "minAmps",
        "normAmps",
        "emergAmps",
        "faultRate",
        "pctperm",
        "repair",
        "baseFreq",
        "enabled",
    ];
    parameters;
    type = "Fault";

    constructor(input: FaultParameters) {
        super();
        this.parameters = faultSchema.parse(input);
    }

    transform() {
        return {
            name: `Fault.${this.parameters.name}`,
            bus1: busTransform(this.parameters.bus1),
            bus2: busTransform(this.parameters.bus2),
            phases: numberTransform(this.parameters.phases),
            r: numberTransform(this.parameters.r),
            "%stddev": numberTransform(this.parameters["%stddev"]),
            gMatrix: arrayTransform(this.parameters.gMatrix),
            onTime: numberTransform(this.parameters.onTime),
            temporary: booleanTransform(this.parameters.temporary),
            minAmps: numberTransform(this.parameters.minAmps),
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
