const checkArgs = (R, C, r0, c0) => {
    // 1 <= R <= 100
    // 1 <= C <= 100
    // 0 <= r0 < R
    // 0 <= c0 < C

    let error = '';
    if (R < 1 || R > 100) {
        error += 'R don\'t fit range 1 <= R <= 100;';
    }
    if (C < 1 || C > 100) {
        error += 'C don\'t fit range 1 <= C <= 100;';
    }
    if (r0 < 0 || r0 > R) {
        error += 'r0 don\'t fit range 0 <= r0 < R;';
    }
    if (c0 < 0 || c0 > C) {
        error += 'c0 don\'t fit range 0 <= c0 < C;';
    }
    return error;
};

const isInsideGrid = (R, C, rowIndex, colIndex) => {
    return (colIndex > -1 && colIndex < C) && (rowIndex > -1 && rowIndex < R);
};

const computeSpiralCoords = (R, C, r0 = 0, c0 = 0) => {
    let err = checkArgs(R, C, r0, c0);
    if (err) {
        throw new Error(err);
    } else {
        const DIRECTIONS = {
            UP: {
                value: 'up',
                fn: () => {
                    if (rowIndex === topBorder) {
                        topBorder--;
                        direction = DIRECTIONS.RIGHT.value;
                        colIndex++;
                    } else {
                        rowIndex--;
                    }
                }
            },
            DOWN: {
                value: 'down',
                fn: () => {
                    if (rowIndex === bottomBorder) {
                        bottomBorder++;
                        direction = DIRECTIONS.LEFT.value;
                    } else {
                        rowIndex++;
                    }
                }
            },
            LEFT: {
                value: 'left',
                fn: () => {
                    if (colIndex === leftBorder) {
                        leftBorder--;
                        direction = DIRECTIONS.UP.value;
                    } else {
                        colIndex--;
                    }
                }
            },
            RIGHT: {
                value: 'right',
                fn: () => {
                    if (colIndex === rightBorder) {
                        rightBorder++;
                        direction = DIRECTIONS.DOWN.value;
                    } else {
                        colIndex++;
                    }
                }
            }
        };

        let direction = DIRECTIONS.RIGHT.value;
        let coords = [];
        let rowIndex = r0;
        let colIndex = c0;
        let rightBorder = colIndex + 1;
        let bottomBorder = rowIndex + 1;
        let leftBorder = colIndex - 1;
        let topBorder = rowIndex - 1;

        while (coords.length < R * C) {

            if (isInsideGrid(R, C, rowIndex, colIndex)) coords.push([rowIndex, colIndex]);

            if (direction === DIRECTIONS.RIGHT.value) DIRECTIONS.RIGHT.fn();

            if (direction === DIRECTIONS.DOWN.value) DIRECTIONS.DOWN.fn();

            if (direction === DIRECTIONS.LEFT.value) DIRECTIONS.LEFT.fn();

            if (direction === DIRECTIONS.UP.value) DIRECTIONS.UP.fn();

        }
        return coords;
    }
};

console.log(computeSpiralCoords(1, 4, 0, 0));
console.log(computeSpiralCoords(5, 6, 1, 4));
