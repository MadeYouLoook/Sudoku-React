import "./App.css";
import { useState } from "react";
import { Cell } from "./Cell";
import { fetchBoard } from "./api/api";
import * as Types from "./types";
import * as Boards from "./boards";

function App() {
	const [board, setBoard] = useState<Types.BoardResponse>(Boards.defaultBoard);

	return (
		<div className="App">
			<button
				className="button"
				onClick={() => {
					fetchBoard(setBoard);
				}}
			>
				TEST
			</button>

			<div className="boardWrapper">
				<div className="board">
					{board.unsolvedSudoku.map((row: number[], rowIndex) =>
						row.map((number: number, columnIndex) => (
							<Cell
								key={rowIndex + columnIndex}
								row={rowIndex}
								col={columnIndex}
								board={board}
								setBoard={setBoard}
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
