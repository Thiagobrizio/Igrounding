import {
    type Complex,
    complex,
    diag,
    exp,
    matrix,
    multiply,
    pi,
    pow,
} from "mathjs";

export type ZPhaseComponents = number[][];

interface Input {
    z0: Complex;
    z1: Complex;
    z2: Complex;
}

export default function calculateZPhaseComponents({ z0, z1, z2 }: Input) {
    const zSequenceMatrix = diag([z0, z1, z2]);

    const alpha = exp(complex(0, (2 / 3) * pi));

    const alphaSquared = pow(alpha, 2) as Complex;

    const alphaMatrix = matrix([
        [1, 1, 1],
        [1, alphaSquared, alpha],
        [1, alpha, alphaSquared],
    ]);

    const alphaMatrix2 = matrix([
        [1, 1, 1],
        [1, alpha, alphaSquared],
        [1, alphaSquared, alpha],
    ]);

    const matrix1 = multiply(alphaMatrix, zSequenceMatrix);
    const matrix2 = multiply(matrix1, alphaMatrix2);
    const zPhaseMatrix = multiply(1 / 3, matrix2);

    return zPhaseMatrix;
}
