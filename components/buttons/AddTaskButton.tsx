import { PlusSVG } from "../../public/svgs/PlusSVG";
import { CustomButtonProps } from "../../types/buttons";

export function AddTaskButton({ clickHandler }: CustomButtonProps) {
	return (
		<>
			<button
				className="bg-primary flex flex-row justify-evenly items-center rounded-md py-3 px-5 w-48 h-12 font-bodyText text-lg "
				onClick={clickHandler}
			>
				<div className="h-2/3 w-auto">
					<PlusSVG />
				</div>
				<p>Add Task</p>
			</button>
		</>
	);
}
