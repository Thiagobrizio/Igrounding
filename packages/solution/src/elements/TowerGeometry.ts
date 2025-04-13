import type { Project } from "@repo/db/controllers/project";

import LineSpacing from "@repo/opendss-interface/classes/lineSpacing";
import { GeometryID } from "@repo/validators/Ids";

export default class TowerGeometry {
    id: GeometryID;
    lineSpacing: LineSpacing;
    constructor(input: Project["towerGeometries"][number]) {
        this.id = input.id;
        this.lineSpacing = new LineSpacing({
            name: input.name,
            nConds: input.conductors.length,
            nPhases: input.conductors.length,
            x: input.conductors.map((conductor) => conductor.x),
            h: input.conductors.map((conductor) => conductor.y),
            units: "m",
        });
    }

    create() {
        return [...this.lineSpacing.create()];
    }
}
