import { StarSVG } from "../../assets/StarSVG";
import { CustomSwitchProps } from "../../types/TypesNConsts";

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
