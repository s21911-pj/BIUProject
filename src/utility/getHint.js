import { arrayDeepCopy, solveSudoku } from "./index.js";

const getHint = (board) => {

    let solvedBoard = arrayDeepCopy(board);
    let solvedStatus = solveSudoku(solvedBoard);


    if (solvedStatus === false) {
        return { board: null, solvedStatus: false };
    }


    let emptyNodePositionList = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j].value === 0) {
                emptyNodePositionList.push([i, j]);
            }
        }
    }


    const randomIndex = Math.floor(Math.random() * emptyNodePositionList.length);
    let row = emptyNodePositionList[randomIndex][0];
    let col = emptyNodePositionList[randomIndex][1];


    let result = arrayDeepCopy(board);
    result[row][col].value = solvedBoard[row][col].value;
    result[row][col].isHinted = true;
    result[row][col].isModifiable = false;

    return { board: result, solvedStatus: true };
};

export default getHint;