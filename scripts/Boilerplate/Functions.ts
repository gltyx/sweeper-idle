export function pointWithinRectangle(px: number, py: number, rx: number, ry: number, rw: number, rh: number) {
    return px >= rx
        && px <= rx + rw
        && py >= ry
        && py <= ry + rh;
}

export function createMultidimensionalArray<TValue>(width: number, height: number, defaultValue: TValue) {
    let multiArray: TValue[][] = [];

    for (let x = 0; x < width; x++) {
        const array: TValue[] = [];
        for (let y = 0; y < height; y++) {
            array.push(defaultValue);
        }
        multiArray.push(array);
    }

    return multiArray;
}

export function randomInt(lower: number, upper: number): number {
    const difference = (upper + 1) - lower;
    const random = Math.random() * difference;
    return Math.ceil(random + lower) - 1;
}