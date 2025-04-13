import type { Project } from "@repo/db/controllers/project";
import type { ConductorTypeID } from "@repo/validators/Ids";

import WireData from "@repo/opendss-interface/classes/wireData";
export default class ConductorType {
    id: ConductorTypeID;
    wireData: WireData;

    constructor(input: Project["conductorTypes"][number]) {
        this.id = input.id;
        this.wireData = new WireData({
            name: input.name,
            diam: input.outerDiameter,
            gmrac: input.gmr,
            rac: input.acResistance75,
            radUnits: "mm",
            gmrUnits: "mm",
            rUnits: "km",
        });
    }

    create() {
        return this.wireData.create();
    }
}
