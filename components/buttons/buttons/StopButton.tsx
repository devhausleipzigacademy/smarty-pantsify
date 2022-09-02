import { StopSVG } from "../../assets/StopSVG";
import { CustomButtonProps } from "../../types/TypesNConsts";

export function StopButton({ clickHandler }: CustomButtonProps) {
  return (
    <button
      onClick={clickHandler}
      className=" bg-whiteTransparent rounded-full p-1 w-5 h-5"
    >
      <StopSVG />
    </button>
  );
}
