import {
    type LineSpacingParameters,
    lineSpacingSchema,
    type OpenDSSLineSpacingParameters,
} from "@repo/validators/opendss/lineSpacing";

import { arrayTransform, numberTransform } from "../helpers/transformers";
import BaseElement from "./BaseElement";

export default class LineSpacing extends BaseElement<
    LineSpacingParameters,
    OpenDSSLineSpacingParameters
> {
    parameterNames: (keyof OpenDSSLineSpacingParameters)[] = [
        "nConds",
        "nPhases",
        "x",
        "h",
        "units",
    ];
    parameters;
    type = "LineSpacing";

    constructor(input: LineSpacingParameters) {
        super();
        this.parameters = lineSpacingSchema.parse(input);
    }

    transform() {
        return {
            name: `LineSpacing.${this.parameters.name}`,
            nConds: numberTransform(this.parameters.nConds),
            nPhases: numberTransform(this.parameters.nPhases),
            x: arrayTransform(this.parameters.x),
            h: arrayTransform(this.parameters.h),
            units: this.parameters.units,
        };
    }
}
