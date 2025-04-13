import { complex } from "mathjs";
import { describe, expect, test } from "vitest";

import calculateZPhaseComponents from "./calculateZPhaseComponents";

describe("calculate Z Phase Components", () => {
    test("should calculate the phase components correctly", () => {
        const z0 = complex(0.3302299, 4.4548014);
        const z1 = complex(0.18118661, 2.8989857);
        const z2 = complex(0.18118661, 2.8989857);

        const result = calculateZPhaseComponents({ z0, z1, z2 });

        expect(result.size()).toEqual([3, 3]);
        expect(result.toArray()).toMatchSnapshot();
    });
});
