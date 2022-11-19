import { Dispatch, SetStateAction } from "react";
import * as Types from "../types";
import * as Boards from "../boards";
import * as Keys from "./keys";

function newBoard(json: any): Types.BoardResponse {
	let board = { ...Boards.defaultBoard };

	if (Keys.boardResponse.difficulty in json) {
		board.difficulty = json[Keys.boardResponse.difficulty];
	}
	if (Keys.boardResponse.solution in json) {
		board.solution = json[Keys.boardResponse.solution];
	}
	if (Keys.boardResponse.unsolvedSudoku in json) {
		board.unsolvedSudoku = json[Keys.boardResponse.unsolvedSudoku];
	}

	return board;
}

export function fetchBoard(
	setBoard: Dispatch<SetStateAction<number[][]>>,
	setBoardResponse: Dispatch<SetStateAction<Types.BoardResponse>>
): Types.BoardResponse {
	const url =
		"https://sudoku-board.p.rapidapi.com/new-board?diff=1&stype=list&solu=true";

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "2974f6fd48msh8ea40f2b6d8698ep125985jsn4812ec4dd5d2",
			"X-RapidAPI-Host": "sudoku-board.p.rapidapi.com",
		},
	};

    console.log("BEG FETCH")
	fetch(url, options)
		.then((response) => response.json())
		.then((json) => {
			let sudoku = newBoard(json.response);
			setBoard(JSON.parse(JSON.stringify(sudoku.unsolvedSudoku)));
			setBoardResponse(JSON.parse(JSON.stringify(sudoku)));
		});

    console.log("END FETCH")

	return Boards.defaultBoard;
}
