import React, {
	useState,
	Dispatch,
	SetStateAction,
	useRef,
	useEffect,
} from "react";
import { boardResponse } from "./api/keys";
import * as Types from "./types";

interface Props {
	row: number;
	col: number;
	board: number[][];
	boardResponse: Types.BoardResponse;
	setBoard: Dispatch<SetStateAction<number[][]>>;
}

export const Cell = (props: Props) => {
	let Design = {
		defaultFontColor: "#4b4b4b",
		errorFontColor: "#824949",
	};

	const [error, setError] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const locked = props.boardResponse.unsolvedSudoku[props.row][props.col];

	useEffect(() => {
		checkError();
	});

	const checkError = () => {
        setError(false)
		if (locked) return;
		if (props.board[props.row][props.col] == 0) return;

		for (let i = 0; i < 9; i++) {
			if (
				props.board[props.row][props.col] === props.board[props.row][i] &&
				i !== props.col
			) {
				setError(true);
			} else if (
				props.board[props.row][props.col] === props.board[i][props.col] &&
				i !== props.row
			) {
				setError(true);
			}
		}
	};

	const keyPressed = (e: React.KeyboardEvent) => {
		const reg = new RegExp("^[0-9]+$");

		console.log(e.key);
		console.log(props.boardResponse.unsolvedSudoku);

		if (!locked && reg.test(e.key)) {
			let boardCopy = [...props.board];
			boardCopy[props.row][props.col] =
				parseInt(e.key) === boardCopy[props.row][props.col]
					? 0
					: parseInt(e.key);
			props.setBoard(boardCopy);
			console.log("SETTING BOARD");
		} else {
			if (e.key === "Escape") {
				if (ref.current) {
					ref.current.blur();
				}
			}
		}
	};

	return (
		<div
			ref={ref}
			className="cell"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Tab") e.preventDefault();
			}}
			onKeyUp={(e) => keyPressed(e)}
			style={{
				color:
					error && !locked ? Design.errorFontColor : Design.defaultFontColor,
			}}
		>
			{props.board[props.row][props.col]
				? props.board[props.row][props.col]
				: " "}
		</div>
	);
};
