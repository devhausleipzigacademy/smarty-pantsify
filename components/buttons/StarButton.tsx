import { StarSVG } from "../../public/svgs/StarSVG";
import { CustomSwitchProps } from "../../types/buttons";

export function StarButton({ value, clickHandler }: CustomSwitchProps) {
	return (
		<>
			<button
				className={
					value ? "fill-primary w-fit h-full" : "fill-inherit w-fit h-full"
				}
				onClick={clickHandler}
			>
				<StarSVG />
			</button>
		</>
	);
}
