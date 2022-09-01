import { PauseSVG } from "../../public/assets/PauseSVG";
import { PlaySVG } from "../../public/assets/PlaySVG";
import { CustomButtonProps } from "../../types/TypesNConsts";

interface Props extends CustomButtonProps {
	paused: boolean;
}

export function PauseButton({ clickHandler, paused }: Props) {
	return (
		<button
			onClick={clickHandler}
			className="w-5 h-5 p-1 rounded-full  bg-whiteTransparent"
		>
			{!paused ? <PauseSVG /> : <PlaySVG />}
		</button>
	);
}
