import splitStringsIntoRows from "./splitArray";

export default function createScript(
    parameters: readonly string[],
    values: Record<string, string | undefined> & { name: string }
) {
    const script: string[] = [`New ${values.name}`];

    parameters.forEach((key) => {
        if (key in values && values[key] !== undefined) {
            const parameter = key.toLowerCase();
            const value = values[key];

            script.push(`${parameter}=${value}`);
        }
    });

    return splitStringsIntoRows(script);
}
