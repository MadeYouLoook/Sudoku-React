import "./App.css";
import { useState } from "react";
import { Cell } from "./components/cell";
import { fetchBoard } from "./api";
import { BoardBackground } from "./components/boardBackground";
import * as Types from "./utility/types";
import { BoardResponse, Boards, Position, Options } from "./utility/defaults";
import * as Utility from "./utility/utility";

function App() {
	const [board, setBoard] = useState<number[][]>(
		Utility.deepCopy(Boards.blank)
	);
	const [boardResponse, setBoardResponse] = useState<Types.BoardResponse>(
		Utility.deepCopy(BoardResponse.default)
	);
	const [focus, setFocus] = useState<Types.Position>(Position.null);
	const [options, setOptions] = useState<Types.Options>(Options.default);

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
								options={options}
								setOptions={setOptions}
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
