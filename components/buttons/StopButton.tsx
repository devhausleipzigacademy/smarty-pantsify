import { StopSVG } from "../../public/assets/StopSVG";
import { CustomButtonProps } from "../../types/TypesNConsts";

export function StopButton({ clickHandler }: CustomButtonProps) {
	return (
		<button
			onClick={clickHandler}
			className="w-5 h-5 p-1 rounded-full  bg-whiteTransparent"
		>
			<StopSVG />
		</button>
	);
}
