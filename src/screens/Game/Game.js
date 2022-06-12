import React, { useState} from "react";

import "./Game.css";
import { AiOutlineMenu } from "react-icons/ai";
import {
    Grid,
    ChoiceBoard,
    Button,
    InformationModal,
    NoSolutionFoundModal,
    GameDetails,
    DifficultySelectionModal,
} from "../../components/index.js";
import {
    animateElement,
    arrayDeepCopy,
    checkBoard,
    checkPlayerWon,
    createSudokuGrid,
    solveSudoku,
} from "../../utility";

import useLocalStorage from "../../hooks/useLocalStorage";

const easyMaxEmptyCells = 30;
const mediumMaxEmptyCells = 40;
const hardMaxEmptyCells = 50;

const Game = () => {
    const [grid, setGrid] = useLocalStorage("currentGrid", null);
    const [startingGrid, setStartingGrid] = useLocalStorage("startingGrid", null);
    const [clickValue, setClickValue] = useLocalStorage("clickValue", 1);
    const [gameMode, setGameMode] = useLocalStorage(
        "gameMode",
        mediumMaxEmptyCells
    );
    const [movesTaken, setMovesTaken] = useLocalStorage("movesTaken", 0);
    const [hintsTaken, setHintsTaken] = useLocalStorage("hintsTaken", 0);
    const [isPlayerWon, setIsPlayerWon] = useLocalStorage("playerWon", false);
    const [pressedSolve, setPressedSolve] = useLocalStorage(
        "pressedSolve",
        false
    );

    const [startTime, setStartTime] = useLocalStorage("startTime", () =>
        Date().toLocaleString()
    );

    const [showInformationModal, setShowInformationModal] = useState(false);
    const [showNoSolutionFoundModal, setShowNoSolutionFoundModal] =
        useState(false);
    const [showGameDetails, setShowGameDetails] = useState(false);
    const [showDifficultySelectionModal, setShowDifficultySelectionModal] =
        useState(false);



    const handleSolve = () => {
        let solvedBoard = arrayDeepCopy(grid);
        let solvedStatus = solveSudoku(solvedBoard);
        if (solvedStatus === false) {
            setShowNoSolutionFoundModal((show) => !show);
            return;
        }
        let newHints = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j].value === 0) {
                    newHints++;
                    solvedBoard[i][j].isHinted = true;
                    solvedBoard[i][j].isModifiable = false;
                }
            }
        }
        setHintsTaken((hints) => hints + newHints);
        setIsPlayerWon(true);
        setShowGameDetails(true);
        setPressedSolve(true);
        setGrid(solvedBoard);
    };

    const handleHint = () => {
        let solvedBoard = arrayDeepCopy(grid);
        let solvedStatus = solveSudoku(solvedBoard);
        if (solvedStatus === false) {
            setShowNoSolutionFoundModal((show) => !show);
            return;
        }
        setHintsTaken((hints) => hints + 1);

        let emptyNodePositionList = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j].value === 0) {
                    emptyNodePositionList.push([i, j]);
                }
            }
        }

        if (emptyNodePositionList.length === 0) return;
        if (emptyNodePositionList.length === 1) setIsPlayerWon(true);


        let newBoard = arrayDeepCopy(grid);
        const hintNode =
            emptyNodePositionList[
                Math.floor(Math.random() * emptyNodePositionList.length)
                ];
        let hint_row = hintNode[0];
        let hint_column = hintNode[1];

        newBoard[hint_row][hint_column].value =
            solvedBoard[hint_row][hint_column].value;
        newBoard[hint_row][hint_column].isHinted = true;
        newBoard[hint_row][hint_column].isModifiable = false;

        setGrid(newBoard);
    };

    const handleNewGame = (maxEmptyCellsCount) => {


        let newSudokuGrid = createSudokuGrid(maxEmptyCellsCount);

        setStartingGrid(arrayDeepCopy(newSudokuGrid));
        setGrid(arrayDeepCopy(newSudokuGrid));

        setGameMode(maxEmptyCellsCount);

        setMovesTaken(0);
        setHintsTaken(0);
        setIsPlayerWon(false);
        setPressedSolve(false);
        setStartTime(() => Date().toLocaleString());

        setShowDifficultySelectionModal((show) => !show);
    };

    const handleClearBoard = () => {
        setIsPlayerWon(false);
        setGrid(arrayDeepCopy(startingGrid));
    };

    const handleCellClick = (row, column, isModifiable) => {
        if (!isModifiable) {
            animateElement(".grid-table", "headShake");
            return;
        }
        if (clickValue !== 0) setMovesTaken((moves) => moves + 1);

        let newGrid = arrayDeepCopy(grid);

        newGrid[row][column].value = clickValue;

        checkBoard(newGrid);

        let playerWon = checkPlayerWon(newGrid);
        if (playerWon) {
            setIsPlayerWon(true);
            setShowGameDetails(true);
        }




        setGrid(newGrid);
    };
    console.log("....");

    if (grid == null && startingGrid == null)handleNewGame(gameMode);
    return (
        <div className="Game">
            <div className="show-game-detail-container-button">
                <button onClick={() => setShowGameDetails((show) => !show)}>
                    <AiOutlineMenu />
                </button>
            </div>


            <h1
                onClick={() => setShowInformationModal((show) => !show)}
                className="main-title"
            >
                Sudoku Game
            </h1>
            {showInformationModal && (
                <InformationModal
                    closeModal={() => setShowInformationModal((show) => !show)}
                />
            )}
            {showNoSolutionFoundModal && (
                <NoSolutionFoundModal
                    closeModal={() => setShowNoSolutionFoundModal((show) => !show)}
                />
            )}
            {showDifficultySelectionModal && (
                <DifficultySelectionModal
                    closeModal={() => setShowDifficultySelectionModal((show) => !show)}
                    handleNewGame={handleNewGame}
                    easyMaxEmptyCells={easyMaxEmptyCells}
                    mediumMaxEmptyCells={mediumMaxEmptyCells}
                    hardMaxEmptyCells={hardMaxEmptyCells}
                />
            )}



            {showGameDetails && (
                <GameDetails
                    closeModal={() => setShowGameDetails((show) => !show)}
                    movesTaken={movesTaken}
                    hintsTaken={hintsTaken}
                    startTime={startTime}
                    isPlayerWon={isPlayerWon}
                    pressedSolve={pressedSolve}
                    gameMode={gameMode}
                    mediumMaxEmptyCells={mediumMaxEmptyCells}
                    hardMaxEmptyCells={hardMaxEmptyCells}
                />
            )}
            <Grid handleCellClick={handleCellClick} grid={grid} />

            <ChoiceBoard setClickValue={setClickValue} selected={clickValue} />

            <div className="action-container">
                <Button
                    onClick={handleClearBoard}
                    buttonStyle="btn--primary--solid"
                    text="Clear"
                />
                <Button
                    onClick={handleSolve}
                    buttonStyle="btn--success--solid"
                    text="Solve"
                />
                <Button
                    onClick={handleHint}
                    buttonStyle="btn--warning--solid"
                    text="Hint"
                />
                <Button
                    onClick={() => setShowDifficultySelectionModal((show) => !show)}
                    buttonStyle="btn--danger--solid"
                    text="New Game"
                />
            </div>
        </div>
    );
};

export default Game;