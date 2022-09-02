import { RefreshSVG } from "../../assets/RefreshSVG";
import { CustomButtonProps } from "../../types/TypesNConsts";

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
