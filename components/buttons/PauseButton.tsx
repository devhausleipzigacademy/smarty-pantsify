import { HomeSVG } from "../../assets/HomeSVG";
import { PauseSVG } from "../../assets/PauseSVG";
import { PlaySVG } from "../../assets/PlaySVG";
import { CustomButtonProps } from "../../types/TypesNConsts";

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
