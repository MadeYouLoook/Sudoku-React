import React, {
	useState,
	Dispatch,
	SetStateAction,
	useRef,
	useEffect,
	useCallback,
} from "react";
import * as Types from "../utility/types";
import * as Color from "../colors";
import { BoardResponseKeys } from "../utility/keys";

interface Props {
	position: Types.Position;
	board: number[][];
	boardResponse: Types.BoardResponse;
	setBoard: Dispatch<SetStateAction<number[][]>>;
	currentFocus: Types.Position;
	setFocus: Dispatch<SetStateAction<Types.Position>>;
}

export const Cell = (props: Props) => {
	const [textColor, setTextColor] = useState(Color.Font.default);
	const [backgroundColor, setBackgroundColor] = useState(Color.Cell.default);
	const [error, setError] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	let locked =
		props.boardResponse.unsolvedSudoku[props.position.row][props.position.col];
	let number = props.board[props.position.row][props.position.col]
		? props.board[props.position.row][props.position.col]
		: " ";

	const setNewLockedCells = useCallback(() => {
		setTextColor(Color.Font.default);

		if (!props.board[props.position.row][props.position.col]) return;

		if (locked) {
			setTextColor(Color.Font.locked);
			return;
		}
	}, [locked, props.board, props.position]);

	const isFocused = useCallback(() => {
		return (
			props.position.col === props.currentFocus.col &&
			props.position.row === props.currentFocus.row
		);
	}, [props.position, props.currentFocus]);

	const isError = useCallback(() => {
		if (!props.board[props.position.row][props.position.col]) {
			setError(false);
			return false;
		}

		// check for errors
		let currentCell = props.board[props.position.row][props.position.col];
		for (let i = 0; i < 9; i++) {
			if (
				currentCell === props.board[props.position.row][i] &&
				i !== props.position.col
			) {
				setError(true);
				return true;
			} else if (
				currentCell === props.board[i][props.position.col] &&
				i !== props.position.row
			) {
				setError(true);
				return true;
			}
		}

		let startingRow = Math.floor(props.position.row / 3) * 3;
		let startingCol = Math.floor(props.position.col / 3) * 3;
		for (let row = startingRow; row < startingRow + 3; row++) {
			for (let col = startingCol; col < startingCol + 3; col++) {
				if (row === props.position.row && col === props.position.col) {
				} else if (props.board[row][col] === currentCell) {
					setError(true);
					return true;
				}
			}
		}

		setError(false);
		return false;
	}, [props.board, props.position]);

	const isHighlighted = useCallback(() => {
		// if they are the same cell dont highlight
		if (props.currentFocus === props.position) return false;
		if (props.currentFocus.row === -1 || props.currentFocus.col === -1)
			return false;

		let currentCell = props.board[props.position.row][props.position.col];
		let focusedCell =
			props.board[props.currentFocus.row][props.currentFocus.col];

		if (focusedCell === 0) return false;
		if (currentCell === focusedCell) return true;
		return false;
	}, [props.board, props.position, props.currentFocus]);

	const updateHover = (enter: boolean) => {
		if (isFocused()) return;
		if (error) {
			setBackgroundColor(Color.Cell.error);
		} else if (isHighlighted()) {
			setBackgroundColor(Color.Cell.highlighted);
		} else {
			setBackgroundColor(enter ? Color.Cell.hover : Color.Cell.default);
		}
	};

	const keyPressed = (e: React.KeyboardEvent) => {
		const reg = new RegExp("^[0-9]+$");

		console.log(e.key);

		if (!locked && reg.test(e.key)) {
			let boardCopy = [...props.board];
			boardCopy[props.position.row][props.position.col] =
				parseInt(e.key) === boardCopy[props.position.row][props.position.col]
					? 0
					: parseInt(e.key);
			props.setBoard(boardCopy);
		} else {
			if (e.key === "Escape") {
				// used to remove the focus so that onFocus doesnt just
				// refocus right away
				if (ref.current) {
					ref.current.blur();
				}
			}
		}
	};

	useEffect(() => {}, [props.board]);

	// when a new board is loaded
	useEffect(() => {
		setNewLockedCells();
	}, [props.boardResponse, setNewLockedCells]);

	// updating background color when:
	// - new cell placed
	// - focus changed
	useEffect(() => {
		if (isFocused()) {
			setBackgroundColor(Color.Cell.focus);
		} else if (isError()) {
			setBackgroundColor(Color.Cell.error);
		} else if (isHighlighted()) {
			setBackgroundColor(Color.Cell.highlighted);
		} else {
			setBackgroundColor(Color.Cell.default);
		}
	}, [props.board, props.position, isError, isFocused]);

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
				color: textColor,
				backgroundColor: backgroundColor,
			}}
			onMouseEnter={() => {
				updateHover(true);
			}}
			onMouseLeave={() => {
				updateHover(false);
			}}
			onFocus={() => {
				props.setFocus(props.position);
			}}
			onBlur={() => {
				props.setFocus({ row: -1, col: -1 });
			}}
		>
			{number}
		</div>
	);
};
