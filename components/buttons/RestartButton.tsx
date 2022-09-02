import { RefreshSVG } from "../../public/assets/RefreshSVG";
import { CustomButtonProps } from "../../types/TypesNConsts";

export function RestartButton({ clickHandler }: CustomButtonProps) {
	return (
		<button
			onClick={clickHandler}
			className="w-5 h-5 p-1 rounded-full bg-whiteTransparent"
		>
			<RefreshSVG />
		</button>
	);
}
