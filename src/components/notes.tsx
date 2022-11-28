import { Dispatch, SetStateAction } from "react";
import * as Color from "../colors";

interface props {
	notes: number[];
	setNotes: Dispatch<SetStateAction<number[]>>;
}

export const Notes = (props: props) => {
	return (
		<div className="notes">
			{props.notes.map((note) => {
				return (
					<div
						className="note"
						style={{
							color: Color.Font.note,
						}}
					>
						{note ? note : ""}
					</div>
				);
			})}
		</div>
	);
};
