import "./App.css";
import { useState } from "react";
import { Cell } from "./Cell";
import { fetchBoard } from "./api/api";
import * as Types from "./types";
import * as Boards from "./boards";

function App() {
	const [board, setBoard] = useState<number[][]>([
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
	]);
	const [boardResponse, setBoardResponse] = useState<Types.BoardResponse>({
		difficulty: 1,
		solution: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		unsolvedSudoku: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
	});

	return (
		<div className="App">
			<button
				className="button"
				onClick={() => {
					console.log("CLICK NEW BOARD")
					fetchBoard(setBoard, setBoardResponse);
				}}
			>
				TEST
			</button>

			<div className="boardWrapper">
				<div className="board">
					{board.map((row: number[], rowIndex) =>
						row.map((number: number, columnIndex) => (
							<Cell
								key={rowIndex + columnIndex}
								row={rowIndex}
								col={columnIndex}
								board={board}
								setBoard={setBoard}
								boardResponse={boardResponse}
							/>
						))
					)}
				</div>

				<div className="boardBackground">
					<div
						className="blockDivider"
						style={{
							gridColumnStart: 2,
							gridColumnEnd: 2,
							gridRowStart: 1,
							gridRowEnd: 6,
						}}
					/>
					<div
						className="blockDivider"
						style={{
							gridColumnStart: 4,
							gridColumnEnd: 4,
							gridRowStart: 1,
							gridRowEnd: 6,
						}}
					/>
					<div
						className="blockDivider"
						style={{
							gridColumnStart: 1,
							gridColumnEnd: 6,
							gridRowStart: 4,
							gridRowEnd: 4,
						}}
					/>
					<div
						className="blockDivider"
						style={{
							gridColumnStart: 1,
							gridColumnEnd: 6,
							gridRowStart: 2,
							gridRowEnd: 2,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
