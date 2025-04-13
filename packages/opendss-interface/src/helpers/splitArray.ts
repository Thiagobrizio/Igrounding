const MAX_LENGTH = 500;

export default function splitStringsIntoRows(inputArray: string[]): string[] {
    const resultArray: string[] = [];

    let currentRow: string[] = [];
    let currentRowLength = 0;

    inputArray.forEach((str) => {
        if (currentRowLength + str.length <= MAX_LENGTH) {
            currentRow.push(str);
            currentRowLength = currentRowLength + str.length;
        } else {
            resultArray.push(currentRow.join(" "));
            currentRow = [`~ ${str}`];
            currentRowLength = str.length;
        }
    });

    // Add the last row to the result array
    if (currentRow.length > 0) {
        resultArray.push(currentRow.join(" "));
    }

    return resultArray;
}
