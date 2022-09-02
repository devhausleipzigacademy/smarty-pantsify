import { PauseSVG } from "../../public/svgs/PauseSVG";
import PlaySVG from "../../public/svgs/PlaySVG";
import { CustomButtonProps } from "../../types/buttons";

interface Props extends CustomButtonProps {
	paused: boolean;
}

export function PauseButton({ clickHandler, paused }: Props) {
	return (
		<button
			onClick={clickHandler}
			className=" h-5  w-5 rounded-full bg-whiteTransparent p-1 "
		>
			{!paused ? <PauseSVG /> : <PlaySVG />}
		</button>
	);
}
