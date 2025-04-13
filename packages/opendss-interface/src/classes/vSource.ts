import {
    type OpenDSSVSourceParameters,
    type VSourceParameters,
    vSourceSchema,
} from "@repo/validators/opendss/VSource";

import {
    arrayTransform,
    booleanTransform,
    busTransform,
    numberTransform,
} from "../helpers/transformers";
import BaseElement from "./BaseElement";

export default class VSource extends BaseElement<
    VSourceParameters,
    OpenDSSVSourceParameters
> {
    parameterNames: (keyof OpenDSSVSourceParameters)[] = [
        "bus1",
        "basekv",
        "pu",
        "angle",
        "frequency",
        "phases",
        "MVAsc3",
        "MVAsc1",
        "x1r1",
        "x0r0",
        "isc3",
        "isc1",
        "r1",
        "x1",
        "r0",
        "x0",
        "scanType",
        "sequence",
        "bus2",
        "z1",
        "z0",
        "z2",
        "puZ1",
        "puZ0",
        "puZ2",
        "baseMVA",
        "yearly",
        "daily",
        "duty",
        "model",
        "puZideal",
        "spectrum",
        "baseFreq",
        "enabled",
    ];
    parameters;
    type = "VSource";
    constructor(input: VSourceParameters) {
        super();
        this.parameters = vSourceSchema.parse(input);
    }
    transform() {
        return {
            name: this.parameters.circuit
                ? `Circuit.${this.parameters.name}`
                : `Vsource.${this.parameters.name}`,
            bus1: busTransform(this.parameters.bus1),
            basekv: numberTransform(this.parameters.basekv),
            pu: numberTransform(this.parameters.pu),
            angle: numberTransform(this.parameters.angle),
            frequency: numberTransform(this.parameters.frequency),
            phases: numberTransform(this.parameters.phases),
            MVAsc3: numberTransform(this.parameters.MVAsc3),
            MVAsc1: numberTransform(this.parameters.MVAsc1),
            x1r1: numberTransform(this.parameters.x1r1),
            x0r0: numberTransform(this.parameters.x0r0),
            isc3: numberTransform(this.parameters.isc3),
            isc1: numberTransform(this.parameters.isc1),
            r1: numberTransform(this.parameters.r1),
            x1: numberTransform(this.parameters.x1),
            r0: numberTransform(this.parameters.r0),
            x0: numberTransform(this.parameters.x0),
            scanType: this.parameters.scanType,
            sequence: this.parameters.sequence,
            bus2: busTransform(this.parameters.bus2),
            z1: arrayTransform(this.parameters.z1),
            z0: arrayTransform(this.parameters.z0),
            z2: arrayTransform(this.parameters.z2),
            puZ1: arrayTransform(this.parameters.puZ1),
            puZ0: arrayTransform(this.parameters.puZ0),
            puZ2: arrayTransform(this.parameters.puZ2),
            baseMVA: numberTransform(this.parameters.baseMVA),
            yearly: this.parameters.yearly,
            daily: this.parameters.daily,
            duty: this.parameters.duty,
            model: this.parameters.model,
            puZideal: arrayTransform(this.parameters.puZideal),
            spectrum: this.parameters.spectrum,
            baseFreq: numberTransform(this.parameters.baseFreq),
            enabled: booleanTransform(this.parameters.enabled),
        };
    }
}
