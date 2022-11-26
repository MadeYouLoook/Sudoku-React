import "./App.css";
import { useState } from "react";
import { Cell } from "./components/cell";
import { fetchBoard } from "./api";
import { BoardBackground } from "./components/boardBackground";
import * as Types from "./types";
import * as Boards from "./utility/boards";
import * as Utility from "./utility/utility";

function App() {
	const [board, setBoard] = useState<number[][]>(
		Utility.deepCopy(Boards.blankBoard)
	);
	const [boardResponse, setBoardResponse] = useState<Types.BoardResponse>(
		Utility.deepCopy(Boards.defaultBoard)
	);
	const [focus, setFocus] = useState<Types.Index>({row: -1, col: -1});

	return (
		<div className="App">
			<button
				className="button"
				onClick={() => {
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
								position={{ row: rowIndex, col: columnIndex }}
								board={board}
								setBoard={setBoard}
								boardResponse={boardResponse}
								currentFocus={focus}
								setFocus={setFocus}
							/>
						))
					)}
				</div>

				<BoardBackground />
			</div>
		</div>
	);
}

export default App;
