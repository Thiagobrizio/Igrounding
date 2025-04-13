import {
    type OpenDSSWireDataParameters,
    type WireDataParameters,
    wireDataSchema,
} from "@repo/validators/opendss/wireData";

import { arrayTransform, numberTransform } from "../helpers/transformers";
import BaseElement from "./BaseElement";

export default class WireData extends BaseElement<
    WireDataParameters,
    OpenDSSWireDataParameters
> {
    parameterNames: (keyof OpenDSSWireDataParameters)[] = [
        "rdc",
        "rac",
        "rUnits",
        "gmrac",
        "gmrUnits",
        "radius",
        "radUnits",
        "normAmps",
        "emergAmps",
        "diam",
        "seasons",
        "ratings",
        "capRadius",
    ];
    parameters;
    type = "WireData";
    constructor(input: WireDataParameters) {
        super();
        this.parameters = wireDataSchema.parse(input);
    }
    transform() {
        return {
            name: `WireData.${this.parameters.name}`,
            rdc: numberTransform(this.parameters.rdc),
            rac: numberTransform(this.parameters.rac),
            rUnits: this.parameters.rUnits,
            gmrac: numberTransform(this.parameters.gmrac),
            gmrUnits: this.parameters.gmrUnits,
            radius: numberTransform(this.parameters.radius),
            radUnits: this.parameters.radUnits,
            normAmps: numberTransform(this.parameters.normAmps),
            emergAmps: numberTransform(this.parameters.emergAmps),
            diam: numberTransform(this.parameters.diam),
            seasons: numberTransform(this.parameters.seasons),
            ratings: arrayTransform(this.parameters.ratings),
            capRadius: numberTransform(this.parameters.capRadius),
        };
    }
}
