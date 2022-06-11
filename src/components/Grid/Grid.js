import React, { useState, useEffect } from "react";

import Node from "../Node/Node";
import {
    animateElement,
    arrayDeepCopy,
    checkBoard,
    createSudokuGrid,
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
    @@ -41,7 +52,10 @@ const Grid = () => {

            checkBoard(newGrid);


            setGrid(newGrid);
            localStorage.setItem("currentGrid", JSON.stringify(newGrid));

        };

        return (
        <div className="Grid">
            <h1 onClick={() => handleReset()}>Reset</h1>

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