import {
    add,
    atan,
    complex,
    cos,
    divide,
    multiply,
    pow,
    sin,
    sqrt,
    subtract,
} from "mathjs";

interface Input {
    voltage: number; // must be in kV
    x1r1: number;
    isc1: number;
    x0r0: number;
    isc3: number;
}

const sqrt3 = sqrt(3) as number;

export default function calculateZSequenceComponents({
    voltage,
    x1r1,
    isc1,
    x0r0,
    isc3,
}: Input) {
    const z1Radius = divide(voltage, multiply(isc3, sqrt3));
    const z1Theta = atan(x1r1);
    const r1 = multiply(z1Radius, cos(z1Theta));
    const x1 = multiply(z1Radius, sin(z1Theta));

    const a = 1 + x0r0 ** 2;
    const b = 4 * (r1 + x1 * x0r0);
    const c = 4 * (r1 ** 2 + x1 ** 2) - ((3 * voltage) / (sqrt3 * isc1)) ** 2;

    const d = subtract(pow(b, 2), multiply(4, multiply(a, c))) as number;

    const r0 = divide(add(multiply(-1, b), sqrt(d)), multiply(2, a)) as number;

    const x0 = multiply(x0r0, r0);

    const z0 = complex(r0, x0);
    const z1 = complex(r1, x1);

    return { z0, z1, z2: z1 };
}
