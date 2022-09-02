import { PlusSVG } from "../../public/assets/PlusSVG";
import { CustomButtonProps } from "../../types/TypesNConsts";

export function AddTaskButton({ clickHandler }: CustomButtonProps) {
	return (
		<>
			<button
				className="flex flex-row items-center w-48 h-12 px-5 py-3 text-lg rounded-md bg-primary justify-evenly font-bodyText "
				onClick={clickHandler}
			>
				<div className="w-auto h-2/3">
					<PlusSVG />
				</div>
				<p>Add Task</p>
			</button>
		</>
	);
}
