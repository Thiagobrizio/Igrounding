import { describe, expect, test } from "vitest";

import calculateZSequenceComponents from "./calculateZSequenceComponents";

describe("calculate Z Sequence Components", () => {
    test("should calculate the phase components correctly", () => {
        const input = {
            voltage: 138000,
            x1r1: 16,
            isc1: 23260,
            x0r0: 13.49,
            isc3: 27430,
        };

        const result = calculateZSequenceComponents(input);
        const expectedOutput = {
            z0: { re: 0.3302299, im: 4.4548014 },
            z1: { re: 0.18118661, im: 2.8989857 },
            z2: { re: 0.18118661, im: 2.8989857 },
        };

        expect(result).toEqual(expectedOutput);
    });
});
