export interface BoardResponse {
	difficulty: number;
	solution: number[][];
	unsolvedSudoku: number[][];
}

export interface Position {
	row: number;
	col: number;
}
