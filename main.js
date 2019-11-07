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
        const DIRECTION = {
            UP: 'up',
            DOWN: 'down',
            LEFT: 'left',
            RIGHT: 'right'
        };

        let direction = DIRECTION.RIGHT;
        let coords = [];
        let rowIndex = r0;
        let colIndex = c0;
        let rightBorder = colIndex + 1;
        let bottomBorder = rowIndex + 1;
        let leftBorder = colIndex - 1;
        let topBorder = rowIndex - 1;

        while (coords.length < R * C) {

            if (isInsideGrid(R, C, rowIndex, colIndex)) {
                coords.push([rowIndex, colIndex]);
            }

            if (direction === DIRECTION.RIGHT) {
                if (colIndex === rightBorder) {
                    rightBorder++;
                    direction = DIRECTION.DOWN;
                } else {
                    colIndex++;
                }
            }
            if (direction === DIRECTION.DOWN) {
                if (rowIndex === bottomBorder) {
                    bottomBorder++;
                    direction = DIRECTION.LEFT;
                } else {
                    rowIndex++;
                }
            }
            if (direction === DIRECTION.LEFT) {
                if (colIndex === leftBorder) {
                    leftBorder--;
                    direction = DIRECTION.UP;
                } else {
                    colIndex--;
                }
            }
            if (direction === DIRECTION.UP) {
                if (rowIndex === topBorder) {
                    topBorder--;
                    direction = DIRECTION.RIGHT;
                    colIndex++;
                } else {
                    rowIndex--;
                }
            }
        }
        return coords;
    }
};

console.log(computeSpiralCoords(1, 4, 0, 0));
// console.log(computeSpiralCoords(5, 6, 1, 4));
