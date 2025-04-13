import type {
    BaseElementInput,
    BaseOpenDSSElement,
} from "@repo/validators/opendss/baseElement";

import { randomUUID } from "crypto";

import splitStringsIntoRows from "../helpers/splitArray";

export default abstract class BaseElement<
    NodeParameters extends BaseElementInput,
    OpenDSSParameters extends BaseOpenDSSElement,
> {
    id: string;
    abstract parameterNames: (keyof OpenDSSParameters)[];
    abstract parameters: NodeParameters;
    abstract type: string;
    constructor() {
        this.id = randomUUID();
    }
    create() {
        const opendssParameters = this.transform();
        const script: string[] = [`New ${opendssParameters.name}`];
        this.parameterNames.forEach((key) => {
            if (
                key in opendssParameters &&
                opendssParameters[key] !== undefined
            ) {
                const parameter = key.toString().toLowerCase();
                const value = opendssParameters[key];
                script.push(`${parameter}=${value}`);
            }
        });

        return splitStringsIntoRows(script);
    }

    abstract transform(): OpenDSSParameters;
}
