import { useState } from "react";
import "./App.css";

function App() {
	interface sudokuResponse {
		response: sudokuBoard;
	}

	interface sudokuBoard {
		difficulty: string;
		solution: number[][];
		unsolvedSudoku: number[][];
	}

	const [board, setBoard] = useState<number[][]>();
	const [solution, setsolution] = useState<number[][]>();
	const [difficulty, setdifficulty] = useState<number[][]>();

	const click = () => {
		console.log("Button Clicks");

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
				console.log(json.response["solution"]);
			});
	};

	return (
		<div className="App">
			<button onClick={click}> TEST </button>
		</div>
	);
}

export default App;
