import React, {
	useState,
	Dispatch,
	SetStateAction,
	useRef,
	useEffect,
	useCallback,
} from "react";
import * as Types from "../api/types";
import * as Color from "../colors";

interface Props {
	row: number;
	col: number;
	position: [number, number];
	board: number[][];
	boardResponse: Types.BoardResponse;
	setBoard: Dispatch<SetStateAction<number[][]>>;
	currentFocus: [number, number];
	setFocus: Dispatch<SetStateAction<[number, number]>>;
}

export const Cell = (props: Props) => {
	const [textColor, setTextColor] = useState(Color.Font.default);
	const [backgroundColor, setBackgroundColor] = useState(Color.Cell.default);
	const [error, setError] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	let locked = props.boardResponse.unsolvedSudoku[props.row][props.col];
	let number = props.board[props.row][props.col]
		? props.board[props.row][props.col]
		: " ";

	const isFocused = () => {
		return (
			props.row == props.currentFocus[0] && props.col == props.currentFocus[1]
		);
	};

	/* const updateLocked = () => {
		locked = props.boardResponse.unsolvedSudoku[props.row][props.col];
	}; */

	const setNewLockedCells = useCallback(() => {
		setTextColor(Color.Font.default);

		if (!props.board[props.row][props.col]) return;

		if (locked) {
			setTextColor(Color.Font.locked);
			return;
		}
	}, [locked, props.board, props.row, props.col]);

	const checkError = useCallback(
		(focused: boolean) => {
			const newError = () => {
				setError(true);
				setBackgroundColor(focused ? Color.Cell.focus : Color.Cell.error);
			};

			if (!props.board[props.row][props.col]) return;

			// check for errors
			for (let i = 0; i < 9; i++) {
				if (
					props.board[props.row][props.col] === props.board[props.row][i] &&
					i !== props.col
				) {
					newError();
					return;
				} else if (
					props.board[props.row][props.col] === props.board[i][props.col] &&
					i !== props.row
				) {
					newError();
					return;
				}
			}

			setBackgroundColor(focused ? Color.Cell.focus : Color.Cell.default);
		},
		[props.board, props.row, props.col]
	);

	const keyPressed = (e: React.KeyboardEvent) => {
		const reg = new RegExp("^[0-9]+$");

		console.log(e.key);

		if (!locked && reg.test(e.key)) {
			let boardCopy = [...props.board];
			boardCopy[props.row][props.col] =
				parseInt(e.key) === boardCopy[props.row][props.col]
					? 0
					: parseInt(e.key);
			props.setBoard(boardCopy);

			if (boardCopy[props.row][props.col] == 0) return;
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

	const updateHover = (enter: boolean) => {
		if (error) return;

		setBackgroundColor(enter ? Color.Cell.hover : Color.Cell.default);
	};

	useEffect(() => {}, [props.board]);

	// when a new board is loaded
	useEffect(() => {
		setNewLockedCells();
	}, [props.boardResponse, setNewLockedCells]);

	useEffect(() => {
		setBackgroundColor()
	}, props.currentFocus)

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
				props.setFocus(props.position)
			}}
			onBlur={() => {
				props.setFocus([-1, -1])
			}}
		>
			{number}
		</div>
	);
};
