import React, { Component, Dispatch, SetStateAction, createRef} from "react";
import * as Types from "./types"

interface Props {
    row: number,
	col: number;
	board: Types.BoardResponse;
    setBoard: Dispatch<SetStateAction<Types.BoardResponse>>;
}

export class Cell extends Component<Props> {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.ref = createRef<HTMLDivElement>();
      }

    keyPressed = (e: React.KeyboardEvent) => {
        const reg = new RegExp('^[0-9]+$');

        console.log(e.key)

        if (reg.test(e.key)) {
            let boardCopy = this.props.board.unsolvedSudoku;
            boardCopy[this.props.row][this.props.col] = parseInt(e.key) === boardCopy[this.props.row][this.props.col] ? 0 : parseInt(e.key);
            this.props.setBoard({...this.props.board, ...{unsolvedSudoku: boardCopy}})
        } else {
            if (e.key === 'Escape') {
                console.log("here")
                if (this.ref.current) {
                    this.ref.current.blur()
                }
            }
        }
		
	}

	render() {
		return (
			<div
                ref={this.ref}
				className="cell"
				tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Tab') e.preventDefault();
                  }}
				onKeyUp={(e) => this.keyPressed(e)}
			>
				{this.props.board.unsolvedSudoku[this.props.row][this.props.col] ? this.props.board.unsolvedSudoku[this.props.row][this.props.col] : null}
			</div>
		);
	}
}
