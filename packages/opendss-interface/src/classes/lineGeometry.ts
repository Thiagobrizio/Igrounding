import {
    type LineGeometryParameters,
    lineGeometrySchema,
    type OpenDSSLineGeometryParameters,
} from "@repo/validators/opendss/lineGeometry";

import {
    arrayTransform,
    booleanTransform,
    numberTransform,
} from "../helpers/transformers";
import BaseElement from "./BaseElement";

export default class LineGeometry extends BaseElement<
    LineGeometryParameters,
    OpenDSSLineGeometryParameters
> {
    parameterNames: (keyof OpenDSSLineGeometryParameters)[] = [
        "nconds",
        "nphases",
        "cond",
        "wire",
        "x",
        "h",
        "units",
        "normAmps",
        "emergAmps",
        "reduce",
        "spacing",
        "wires",
        "cncable",
        "tscable",
        "cncables",
        "tscables",
        "seasons",
        "ratings",
        "lineType",
    ];
    parameters;
    type = "LineGeometry";
    constructor(input: LineGeometryParameters) {
        super();
        this.parameters = lineGeometrySchema.parse(input);
    }
    transform() {
        return {
            name: `LineGeometry.${this.parameters.name}`,
            nconds: numberTransform(this.parameters.nconds),
            nphases: numberTransform(this.parameters.nphases),
            cond: numberTransform(this.parameters.cond),
            wire: this.parameters.wire,
            x: numberTransform(this.parameters.x),
            h: numberTransform(this.parameters.h),
            units: this.parameters.units,
            normAmps: numberTransform(this.parameters.normAmps),
            emergAmps: numberTransform(this.parameters.emergAmps),
            reduce: booleanTransform(this.parameters.reduce),
            spacing: this.parameters.spacing,
            wires: arrayTransform(this.parameters.wires),
            cncable: this.parameters.cncable,
            tscable: this.parameters.tscable,
            cncables: arrayTransform(this.parameters.cncables),
            tscables: arrayTransform(this.parameters.tscables),
            seasons: numberTransform(this.parameters.seasons),
            ratings: arrayTransform(this.parameters.ratings),
            lineType: this.parameters.lineType,
        };
    }
}
