import React, { Component, Dispatch, SetStateAction, createRef} from "react";
import * as Types from "./types"

interface Props {
    row: number
	col: number
	board: Types.BoardResponse
    setBoard: Dispatch<SetStateAction<Types.BoardResponse>>
}

interface State {
    error: boolean
}

export class Cell extends Component<Props, State> {
    private Design = {
        defaultFontColor: "#4b4b4b",
        errorFontColor: "#824949",
    }

    ref: React.RefObject<HTMLDivElement>;

    state: State = {
        error: false
    }

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
                if (this.ref.current) {
                    this.ref.current.blur()
                }
            }
        }
		
        this.state.error = false
        for (let i = 0; i < 9; i++) {
            if (!this.props.board.unsolvedSudoku[this.props.row][this.props.col]) {
                continue
            }
            
            if (this.props.board.unsolvedSudoku[this.props.row][this.props.col] == this.props.board.unsolvedSudoku[this.props.row][i] && i != this.props.col) {
                this.state.error = true
            } else if (this.props.board.unsolvedSudoku[this.props.row][this.props.col] == this.props.board.unsolvedSudoku[i][this.props.col] && i != this.props.row) {
                this.state.error = true
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
                style={
                    {color: this.state.error ? this.Design.errorFontColor : this.Design.defaultFontColor}
                }
			>
				{this.props.board.unsolvedSudoku[this.props.row][this.props.col] ? this.props.board.unsolvedSudoku[this.props.row][this.props.col] : null}
			</div>
		);
	}
}
