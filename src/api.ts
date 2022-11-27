import { Dispatch, SetStateAction } from "react";
import * as Types from "./utility/types";
import { BoardResponse } from "./utility/defaults";
import * as Keys from "./utility/keys";
import { deepCopy } from "./utility/utility";

function newBoard(json: any): Types.BoardResponse {
	let board = BoardResponse.default;

	if (Keys.BoardResponseKeys.difficulty in json) {
		board.difficulty = json[Keys.BoardResponseKeys.difficulty];
	}
	if (Keys.BoardResponseKeys.solution in json) {
		board.solution = json[Keys.BoardResponseKeys.solution];
	}
	if (Keys.BoardResponseKeys.unsolvedSudoku in json) {
		board.unsolvedSudoku = json[Keys.BoardResponseKeys.unsolvedSudoku];
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

	fetch(url, options)
		.then((response) => response.json())
		.then((json) => {
			let sudoku = newBoard(json.response);
			setBoard(deepCopy(sudoku.unsolvedSudoku));
			setBoardResponse(deepCopy(sudoku));
		});

	return BoardResponse.default;
}
