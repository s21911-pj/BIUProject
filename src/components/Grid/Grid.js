import React, { useState, useEffect } from "react";

import Node from "../Node/Node";
import {
    animateElement,
    arrayDeepCopy,
    checkBoard,
    createSudokuGrid,
    solveSudoku,
} from "../../index";

import "./Grid.css";
import "animate.css";

const Grid = () => {
    const [grid, setGrid] = useState(null);
    const [startingGrid, setStartingGrid] = useState(null);

    useEffect(() => {

        let newSudokuGrid = createSudokuGrid();
        setStartingGrid(arrayDeepCopy(newSudokoGrid));
        setGrid(arrayDeepCopy(newSudokoGrid));
        if (
            localStorage.getItem("startingGrid") == null ||
            localStorage.getItem("currentGrid") == null
        ) {
            let newSudokuGrid = createSudokuGrid();
            setStartingGrid(arrayDeepCopy(newSudokuGrid));
            setGrid(arrayDeepCopy(newSudokuGrid));

            localStorage.setItem("startingGrid", JSON.stringify(newSudokuGrid));
            localStorage.setItem("currentGrid", JSON.stringify(newSudokuGrid));
        } else {
            setStartingGrid(JSON.parse(localStorage.getItem("startingGrid")));
            setGrid(JSON.parse(localStorage.getItem("currentGrid")));
        }
    }, []);

    const handleReset = () => {
        setGrid(arrayDeepCopy(startingGrid));
        localStorage.setItem("currentGrid", JSON.stringify(startingGrid));
    };git

    const handleSolve = () => {
        let solvedBoard = JSON.parse(JSON.stringify(grid));
        let solvedStatus = solveSudoku(solvedBoard);
        if (solvedStatus === false) {
            alert("Cannot be solved!");

            return;
        }

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j].value === 0) {
                    solvedBoard[i][j].isHinted = true;
                }
            }
        }
        setGrid(solvedBoard);
    };

    const handleHint = () => {
        let solvedBoard = JSON.parse(JSON.stringify(grid));
        let solvedStatus = solveSudoku(solvedBoard);
        if (solvedStatus === false) {
            alert("Cannot be solved!");
            return;
        }

        let emptyNodePositionList = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j].value === 0) {
                    emptyNodePositionList.push([i, j]);
                }
            }
        }
    };



    const handleCellClick = (row, column, isModifiable) => {
        if (!isModifiable) {
            animateElement(".grid-table", "headShake");
            return;
        }

        let newGrid = [...grid];

        newGrid[row][column].value = newGrid[row][column].value + 1;
        if (newGrid[row][column].value > 9) newGrid[row][column].value = 0;



        checkBoard(newGrid);


        setGrid(newGrid);
        localStorage.setItem("currentGrid", JSON.stringify(newGrid));

    };

    return (
        <div className="Grid">
            <h1 onClick={() => handleReset()}>Reset</h1>
            <h1 onClick={() => handleSolve()}>Solve</h1>
            <h1 onClick={() => handleHint()}>Hint</h1>

            <table className="grid-table">
                <tbody>
                {grid &&
                    grid.map((row, rowIndex) => {
                        return (
                            <tr className="row" key={rowIndex}>
                                {row.map((cell, columnIndex) => {
                                    return (
                                        <Node
                                            key={rowIndex + "-" + columnIndex}
                                            cell={cell}
                                            handleClickCallback={handleCellClick}
                                        />
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Grid;