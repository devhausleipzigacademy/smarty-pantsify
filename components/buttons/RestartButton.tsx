import { RefreshSVG } from "../../public/svgs/RefreshSVG";
import { CustomButtonProps } from "../../types/buttons";

export function RestartButton({ clickHandler }: CustomButtonProps) {
	return (
		<button
			onClick={clickHandler}
			className="  bg-whiteTransparent rounded-full p-1 w-5 h-5"
		>
			<RefreshSVG />
		</button>
	);
}
