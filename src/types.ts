export interface BoardResponse {
	difficulty: number;
	solution: number[][];
	unsolvedSudoku: number[][];
}

export interface Index {
	row: number;
	col: number;
}
